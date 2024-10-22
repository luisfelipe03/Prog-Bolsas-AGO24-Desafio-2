import { Request, Response } from "express";
import { convertAddressToString, getAddressByCEP } from "../utils/viaCEP";
import { getCoordinatesByAddress } from "../utils/googleGeocoding";
import { Store } from "../models/store";
import { haversineDistance } from "../utils/haversine";

// Função auxiliar para envio de respostas
const handleResponse = (res: Response, statusCode: number, message: any) => {
  res.status(statusCode).json({ message });
};

// Cria uma nova loja
export const createStore = async (req: Request, res: Response) => {
  try {
    const { name, phone, cep } = req.body;
    const address = await getAddressByCEP(cep);

    if (!address) return handleResponse(res, 404, "CEP não encontrado");

    const addressString = convertAddressToString(address);
    const coordinates = await getCoordinatesByAddress(addressString);

    if (!coordinates)
      return handleResponse(res, 500, "Erro ao buscar as coordenadas");

    const store = new Store({
      name,
      phone,
      zip: cep,
      ...address,
      ...coordinates,
    });

    await store.save();
    res.status(201).json(store);
  } catch (error) {
    console.error("Erro ao criar loja:", error);
    handleResponse(res, 500, "Erro ao criar loja");
  }
};

// Obtém todas as lojas com contagem
export const getStore = async (_req: Request, res: Response) => {
  try {
    const stores = await Store.find();
    res.status(200).json({ count: stores.length, stores });
  } catch (error) {
    console.error("Erro ao buscar lojas:", error);
    handleResponse(res, 500, "Erro ao buscar lojas");
  }
};

// Obtém loja por ID
export const getStoreById = async (req: Request, res: Response) => {
  try {
    const store = await Store.findById(req.params.id).lean();
    if (!store) return handleResponse(res, 404, "Loja não encontrada");

    res.status(200).json(store);
  } catch (error) {
    console.error("Erro ao buscar loja por ID:", error);
    handleResponse(res, 500, "Erro ao buscar loja");
  }
};

// Obtém lojas por estado com contagem
export const getStoreByState = async (req: Request, res: Response) => {
  try {
    const stores = await Store.find({ state: req.params.state });
    if (stores.length === 0)
      return handleResponse(res, 404, "Nenhuma loja encontrada nesse estado");

    res.status(200).json({ count: stores.length, stores });
  } catch (error) {
    console.error("Erro ao buscar lojas por estado:", error);
    handleResponse(res, 500, "Erro ao buscar lojas por estado");
  }
};

// Obtém lojas próximas de um CEP com contagem
export const getStoresNearby = async (req: Request, res: Response) => {
  try {
    const { cep } = req.params;
    const address = await getAddressByCEP(cep);

    if (!address) return handleResponse(res, 404, "CEP não encontrado");

    const addressString = convertAddressToString(address);
    const coordinates = await getCoordinatesByAddress(addressString);

    if (!coordinates)
      return handleResponse(res, 500, "Erro ao buscar as coordenadas");

    const stores = await Store.find().lean();
    if (!stores || stores.length === 0)
      return handleResponse(res, 404, "Lojas não encontradas");

    const accessibleStores = stores
      .map((store) => {
        const distance = haversineDistance(
          store.latitude,
          store.longitude,
          coordinates.latitude,
          coordinates.longitude
        ).toFixed(1);

        return {
          name: store.name,
          phone: store.phone,
          street: store.street,
          neighborhood: store.neighborhood,
          city: store.city,
          state: store.state,
          zip: store.zip,
          distance: `${distance}KM`,
        };
      })
      .filter((store) => parseFloat(store.distance) <= 100);

    if (accessibleStores.length === 0)
      return handleResponse(res, 404, "Nenhuma loja encontrada");

    accessibleStores.sort(
      (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
    );

    res.status(200).json({
      addressClient: address,
      count: accessibleStores.length,
      stores: accessibleStores,
    });
  } catch (error) {
    console.error("Erro ao buscar lojas próximas:", error);
    handleResponse(res, 500, "Erro ao buscar lojas próximas");
  }
};

// Atualiza uma loja existente
export const updateStore = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, phone, cep } = req.body;

    // Encontra a loja pelo ID
    const store = await Store.findById(id);
    if (!store) return res.status(404).json({ message: "Loja não encontrada" });

    // Se o CEP foi alterado, buscar o novo endereço e coordenadas
    if (cep && cep !== store.zip) {
      const address = await getAddressByCEP(cep);
      if (!address)
        return res.status(404).json({ message: "CEP não encontrado" });

      const addressString = convertAddressToString(address);
      const coordinates = await getCoordinatesByAddress(addressString);

      if (!coordinates)
        return res
          .status(500)
          .json({ message: "Erro ao buscar as coordenadas" });

      store.zip = cep;
      store.street = address.street;
      store.neighborhood = address.neighborhood;
      store.city = address.city;
      store.state = address.state;
      store.latitude = coordinates.latitude;
      store.longitude = coordinates.longitude;
    }

    // Atualizar outros campos se fornecidos
    if (name) store.name = name;
    if (phone) store.phone = phone;

    await store.save();
    res.status(200).json({ message: "Loja atualizada com sucesso", store });
  } catch (error) {
    console.error("Erro ao atualizar loja:", error);
    res.status(500).json({ message: "Erro ao atualizar loja" });
  }
};

// Deleta uma loja existente
export const deleteStore = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Encontra e deleta a loja pelo ID
    const store = await Store.findByIdAndDelete(id);
    if (!store) return res.status(404).json({ message: "Loja não encontrada" });

    res.status(200).json({ message: "Loja deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar loja:", error);
    res.status(500).json({ message: "Erro ao deletar loja" });
  }
};