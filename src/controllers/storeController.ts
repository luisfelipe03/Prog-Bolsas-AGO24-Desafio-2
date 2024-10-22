import { Request, Response } from "express";
import { convertAddressToString, getAddressByCEP } from "../utils/viaCEP";
import { getCoordinatesByAddress } from "../utils/googleGeocoding";
import { Store } from "../models/store";
import { haversineDistance } from "../utils/haversine";

export const createStore = async (req: Request, res: Response) => {
  const { name, phone, cep } = req.body;

  const address = await getAddressByCEP(cep);

  if (!address) {
    res.status(404).send("CEP não encontrado");
    return;
  }

  const addressString = convertAddressToString(address);

  const coordinates = await getCoordinatesByAddress(addressString);

  if (!coordinates) {
    res.status(500).send("Erro ao buscar as coordenadas");
    return;
  }

  const store = new Store({
    name,
    phone,
    zip: cep,
    ...address,
    ...coordinates,
  });

  await store.save();

  res.status(201).send(store);
};

export const getStore = async (req: Request, res: Response) => {
  const stores = await Store.find();

  res.status(200).json({ count: stores.length, stores });
};

export const getStoreById = async (req: Request, res: Response) => {
  const store = await Store.findById(req.params.id).lean();

  if (!store) {
    res.status(404).send("Loja não encontrada");
    return;
  }

  res.send(store);
};

export const getStoreByState = async (req: Request, res: Response) => {
  const stores = await Store.find({ state: req.params.state });

  res.send(stores);
};

export const getStoresNearby = async (req: Request, res: Response) => {
  const { cep } = req.params;

  const address = await getAddressByCEP(cep);
  if (!address) {
    res.status(404).json({ message: "CEP não encontrado" });
    return;
  }

  const addressString = convertAddressToString(address);

  const coordinates = await getCoordinatesByAddress(addressString);
  if (!coordinates) {
    res.status(500).json({ message: "Erro ao buscar as coordenadas" });
    return;
  }

  const stores = await Store.find().lean();
  if (!stores || stores.length === 0) {
    res.status(404).json({ message: "Lojas não encontradas" });
    return;
  }

  const accessibleStores = stores
    .map((store) => {
      const distance = haversineDistance(
        store.latitude,
        store.longitude,
        coordinates.latitude,
        coordinates.longitude
      );
      const distanceInKM = distance.toFixed(1) + "KM";

      return {
        name: store.name,
        phone: store.phone,
        street: store.street,
        neighborhood: store.neighborhood,
        city: store.city,
        state: store.state,
        zip: store.zip,
        distance: distanceInKM,
      };
    })
    .filter((store) => {
      const distance = parseFloat(store.distance);
      return distance <= 100;
    });

  accessibleStores.sort(
    (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
  );

  res.json({ count: accessibleStores.length, stores: accessibleStores });
};
