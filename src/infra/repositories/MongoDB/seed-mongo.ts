import logger from "../../config/logger";
import { client } from "./connectMongo";
import { randomUUID } from "crypto";

// Dados de seed
const storesSeedData = [
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Caruaru",
            phone: "(81) 3101-3200",
            address: {
                street: "Rua Vigário Freire",
                neighborhood: "Nossa Senhora das Dores",
                city: "Caruaru",
                state: "PE",
                zip: "55002-200",
                latLng: {
                    lat: -8.285526,
                    lng: -35.9684023,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Garanhuns",
            phone: "(87) 3764-5400",
            address: {
                street: "Avenida Santo Antônio",
                neighborhood: "Santo Antônio",
                city: "Garanhuns",
                state: "PE",
                zip: "55293-000",
                latLng: {
                    lat: -8.8909838,
                    lng: -36.4944597,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Jaboatão dos Guararapes",
            phone: "(81) 3363-4550",
            address: {
                street: "Rua Santo Elias",
                neighborhood: "Cajueiro Seco",
                city: "Jaboatão dos Guararapes",
                state: "PE",
                zip: "54330-230",
                latLng: {
                    lat: -8.1671451,
                    lng: -34.9274565,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Recife",
            phone: "(81) 3497-3100",
            address: {
                street: "Avenida Marechal Mascarenhas de Moraes",
                neighborhood: "Imbiribeira",
                city: "Recife",
                state: "PE",
                zip: "51150-001",
                latLng: {
                    lat: -8.1081496,
                    lng: -34.9116229,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore João Pessoa",
            phone: "(83) 3214-1750",
            address: {
                street: "Praça Aristides Lobo",
                neighborhood: "Centro",
                city: "João Pessoa",
                state: "PB",
                zip: "58010-320",
                latLng: {
                    lat: -7.1191204,
                    lng: -34.8857856,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Campina Grande",
            phone: "(83) 3315-1100",
            address: {
                street: "Rua Presidente João Pessoa",
                neighborhood: "Centro",
                city: "Campina Grande",
                state: "PB",
                zip: "58400-002",
                latLng: {
                    lat: -7.2164509,
                    lng: -35.8896766,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Maceió",
            phone: "(82) 3217-7000",
            address: {
                street: "Avenida Fernandes Lima",
                neighborhood: "Farol",
                city: "Maceió",
                state: "AL",
                zip: "57050-000",
                latLng: {
                    lat: -9.6437015,
                    lng: -35.734651,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Fortaleza",
            phone: "(85) 3499-8900",
            address: {
                street: "Rua Joaquim Bezerra",
                neighborhood: "Messejana",
                city: "Fortaleza",
                state: "CE",
                zip: "60842-010",
                latLng: {
                    lat: -3.8314074,
                    lng: -38.4929127,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Sobral",
            phone: "(88) 3677-5100",
            address: {
                street: "Rua Menino Deus",
                neighborhood: "Centro",
                city: "Sobral",
                state: "CE",
                zip: "62010-310",
                latLng: {
                    lat: -3.6897759,
                    lng: -40.3485628,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Natal",
            phone: "(84) 3235-2701",
            address: {
                street: "Avenida Engenheiro Roberto Freire",
                neighborhood: "Capim Macio",
                city: "Natal",
                state: "RN",
                zip: "59082-400",
                latLng: {
                    lat: -5.8583316,
                    lng: -35.1954004,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Mossoró",
            phone: "(84) 3315-7600",
            address: {
                street: "Rua Coronel Gurgel",
                neighborhood: "Centro",
                city: "Mossoró",
                state: "RN",
                zip: "59600-200",
                latLng: {
                    lat: -5.194421,
                    lng: -37.3439756,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Feira de Santana",
            phone: "(75) 3611-0000",
            address: {
                street: "Avenida Senhor dos Passos",
                neighborhood: "Centro",
                city: "Feira de Santana",
                state: "BA",
                zip: "44002-200",
                latLng: {
                    lat: -12.2562005,
                    lng: -38.9654358,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Salvador",
            phone: "(74) 3261-7100",
            address: {
                street: "Avenida Tancredo Neves",
                neighborhood: "Caminho das Árvores",
                city: "Salvador",
                state: "BA",
                zip: "41820-910",
                latLng: {
                    lat: -12.9791968,
                    lng: -38.4586653,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Aracaju",
            phone: "(79) 3198-3000",
            address: {
                street: "Travessa José de Faro",
                neighborhood: "Centro",
                city: "Aracaju",
                state: "SE",
                zip: "49010-120",
                latLng: {
                    lat: -10.9138075,
                    lng: -37.0491803,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Teresina",
            phone: "(86) 3580-3000",
            address: {
                street: "Rua Candido Portinari",
                neighborhood: "Triunfo",
                city: "Teresina",
                state: "PI",
                zip: "64022-055",
                latLng: {
                    lat: -5.1287989,
                    lng: -42.7948077,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore São Luís",
            phone: "(98) 3133-7300",
            address: {
                street: "Avenida Jerônimo de Albuquerque Maranhão",
                neighborhood: "COHAB Anil III",
                city: "São Luís",
                state: "MA",
                zip: "65050-175",
                latLng: {
                    lat: -2.5407798,
                    lng: -44.2189995,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore São Paulo",
            phone: "(11) 4003-4333",
            address: {
                street: "Praça da Sé",
                neighborhood: "Sé",
                city: "São Paulo",
                state: "SP",
                zip: "01001-000",
                latLng: {
                    lat: -23.5503099,
                    lng: -46.6342009,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Campinas",
            phone: "(19) 3512-5500",
            address: {
                street: "Rua General Osório",
                neighborhood: "Centro",
                city: "Campinas",
                state: "SP",
                zip: "13010-111",
                latLng: {
                    lat: -22.9037638,
                    lng: -47.0593647,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Rio de Janeiro",
            phone: "(21) 3505-7500",
            address: {
                street: "Rua Primeiro de Março",
                neighborhood: "Centro",
                city: "Rio de Janeiro",
                state: "RJ",
                zip: "20010-000",
                latLng: {
                    lat: -22.9013187,
                    lng: -43.1764795,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Niterói",
            phone: "(21) 3613-8300",
            address: {
                street: "Travessa São Jorge",
                neighborhood: "Centro",
                city: "Niterói",
                state: "RJ",
                zip: "24020-120",
                latLng: {
                    lat: -22.8725448,
                    lng: -43.0934873,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Belo Horizonte",
            phone: "(31) 4003-3434",
            address: {
                street: "Avenida Afonso Pena",
                neighborhood: "Centro",
                city: "Belo Horizonte",
                state: "MG",
                zip: "30130-000",
                latLng: {
                    lat: -19.9218902,
                    lng: -43.9368043,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Contagem",
            phone: "(31) 3422-9800",
            address: {
                street: "Avenida Sócrates Mariani Bittencourt",
                neighborhood: "Cinco",
                city: "Contagem",
                state: "MG",
                zip: "32010-010",
                latLng: {
                    lat: -19.9423511,
                    lng: -44.0669257,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Porto Alegre",
            phone: "(51) 3287-7900",
            address: {
                street: "Rua General Câmara",
                neighborhood: "Centro Histórico",
                city: "Porto Alegre",
                state: "RS",
                zip: "90010-230",
                latLng: {
                    lat: -30.0304328,
                    lng: -51.2299967,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Caxias do Sul",
            phone: "(54) 3531-4300",
            address: {
                street: "Avenida Júlio de Castilhos",
                neighborhood: "Nossa Senhora de Lourdes",
                city: "Caxias do Sul",
                state: "RS",
                zip: "95010-000",
                latLng: {
                    lng: -51.1637305,
                    lat: -29.1675486,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Curitiba",
            phone: "(41) 3203-8300",
            address: {
                street: "Rua José Loureiro",
                neighborhood: "Centro",
                city: "Curitiba",
                state: "PR",
                zip: "80010-000",
                latLng: {
                    lat: -25.4320888,
                    lng: -49.2683245,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Londrina",
            phone: "(43) 3372-7500",
            address: {
                street: "Avenida Paraná",
                neighborhood: "Centro",
                city: "Londrina",
                state: "PR",
                zip: "86010-390",
                latLng: {
                    lat: -23.3109367,
                    lng: -51.1614928,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Florianópolis",
            phone: "(48) 3664-8700",
            address: {
                street: "Praça Quinze de Novembro",
                neighborhood: "Centro",
                city: "Florianópolis",
                state: "SC",
                zip: "88010-400",
                latLng: {
                    lat: -27.5976866,
                    lng: -48.5494203,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Joinville",
            phone: "(47) 3027-5800",
            address: {
                street: "Rua Nove de Março",
                neighborhood: "Centro",
                city: "Joinville",
                state: "SC",
                zip: "89201-400",
                latLng: {
                    lat: -26.3015857,
                    lng: -48.8459817,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Goiânia",
            phone: "(62) 3245-9000",
            address: {
                street: "Rua 21",
                neighborhood: "Setor Central",
                city: "Goiânia",
                state: "GO",
                zip: "74030-070",
                latLng: {
                    lat: -16.6759747,
                    lng: -49.2526564,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Aparecida de Goiânia",
            phone: "(62) 3545-7000",
            address: {
                street: "Rodovia BR-153",
                neighborhood: "Setor Central",
                city: "Aparecida de Goiânia",
                state: "GO",
                zip: "74980-180",
                latLng: {
                    lat: -18.183346,
                    lng: -49.2905251,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Brasília",
            phone: "(61) 3321-5400",
            address: {
                street: "Quadra SBN Quadra 1",
                neighborhood: "Asa Norte",
                city: "Brasília",
                state: "DF",
                zip: "70040-010",
                latLng: {
                    lat: -15.7913103,
                    lng: -47.87834549999999,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Taguatinga",
            phone: "(61) 3351-2300",
            address: {
                street: "Quadra QSB AE",
                neighborhood: "Taguatinga Sul (Taguatinga)",
                city: "Brasília",
                state: "DF",
                zip: "72015-000",
                latLng: {
                    lat: -15.85181,
                    lng: -48.04185,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Cuiabá",
            phone: "(65) 3318-5900",
            address: {
                street: "Rua Atenas",
                neighborhood: "Despraiado",
                city: "Cuiabá",
                state: "MT",
                zip: "78048-080",
                latLng: {
                    lat: -15.5763263,
                    lng: -56.0896789,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Várzea Grande",
            phone: "(65) 3223-4300",
            address: {
                street: "Avenida Castelo Branco",
                neighborhood: "Centro-Sul",
                city: "Várzea Grande",
                state: "MT",
                zip: "78110-000",
                latLng: {
                    lat: -15.6569567,
                    lng: -56.1318512,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Campo Grande",
            phone: "(67) 4009-9300",
            address: {
                street: "Rua Treze de Maio",
                neighborhood: "Centro",
                city: "Campo Grande",
                state: "MS",
                zip: "79002-350",
                latLng: {
                    lat: -20.4653547,
                    lng: -54.6154833,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Dourados",
            phone: "(67) 3421-4300",
            address: {
                street: "Rua Toshinobu Katayama",
                neighborhood: "Vila Planalto",
                city: "Dourados",
                state: "MS",
                zip: "79826-110",
                latLng: {
                    lat: -22.2204456,
                    lng: -54.8050583,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Palmas",
            phone: "(63) 3218-8700",
            address: {
                street: "Quadra ARSE 12 Alameda 14",
                neighborhood: "Plano Diretor Sul",
                city: "Palmas",
                state: "TO",
                zip: "77020-062",
                latLng: {
                    lat: -10.2745522,
                    lng: -48.318512,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Araguaína",
            phone: "(63) 3411-5600",
            address: {
                street: "Avenida Cônego João Lima",
                neighborhood: "Setor Central",
                city: "Araguaína",
                state: "TO",
                zip: "77804-010",
                latLng: {
                    lat: -7.1916467,
                    lng: -48.2092141,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Manaus",
            phone: "(92) 3622-9000",
            address: {
                street: "Rua Joaquim Sarmento",
                neighborhood: "Centro",
                city: "Manaus",
                state: "AM",
                zip: "69010-020",
                latLng: {
                    lat: -3.1327567,
                    lng: -60.0250415,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Parintins",
            phone: "(92) 3532-7200",
            address: {
                street: "Avenida Amazonas",
                neighborhood: "Centro",
                city: "Parintins",
                state: "AM",
                zip: "69151-000",
                latLng: {
                    lat: -2.6273547,
                    lng: -56.7356802,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Belém",
            phone: "(91) 3201-7400",
            address: {
                street: "Avenida Presidente Vargas",
                neighborhood: "Campina",
                city: "Belém",
                state: "PA",
                zip: "66010-000",
                latLng: {
                    lat: -1.4513369,
                    lng: -48.4966668,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Ananindeua",
            phone: "(91) 3238-6500",
            address: {
                street: "Rodovia BR-316",
                neighborhood: "Centro",
                city: "Ananindeua",
                state: "PA",
                zip: "67030-000",
                latLng: {
                    lat: -1.3667202,
                    lng: -48.3704618,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Porto Velho",
            phone: "(69) 3221-9800",
            address: {
                street: "Avenida Presidente Dutra",
                neighborhood: "Centro",
                city: "Porto Velho",
                state: "RO",
                zip: "76801-059",
                latLng: {
                    lat: -8.7641627,
                    lng: -63.9061271,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Ji-Paraná",
            phone: "(69) 3422-7600",
            address: {
                street: "Rua Terezina",
                neighborhood: "Nova Brasília",
                city: "Ji-Paraná",
                state: "RO",
                zip: "76908-330",
                latLng: {
                    lat: -10.8908008,
                    lng: -61.9147083,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Boa Vista",
            phone: "(95) 3224-6600",
            address: {
                street: "Rua Floriano Peixoto",
                neighborhood: "Centro",
                city: "Boa Vista",
                state: "RR",
                zip: "69301-320",
                latLng: {
                    lat: 2.8175469,
                    lng: -60.6661811,
                },
            },
        },
    },
    {
        id: randomUUID(),
        props: {
            name: "InfoStore Rio Branco",
            phone: "(68) 3221-8700",
            address: {
                street: "Rua Machado de Assis",
                neighborhood: "Conjunto Castelo Branco",
                city: "Rio Branco",
                state: "AC",
                zip: "69911-268",
                latLng: {
                    lat: -9.9777117,
                    lng: -67.8288432,
                },
            },
        },
    },
];

export const seedMongo = async () => {
    const stores: any[] = await client
        .db()
        .collection("stores")
        .find()
        .toArray();

    if (stores.length === 0) {
        storesSeedData.forEach((store) => {
            client.db().collection("stores").insertOne(store);
            logger.info(`Dados inseridos para a loja ${store.props.name}`);
        });
        logger.info("Seed finalizado");
    } else {
        logger.info("Seed já foi executado anteriormente. Dados já existem.");
    }
};
