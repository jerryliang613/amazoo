export const PRODUCTS = [
    {
        id: '1',
        title: 'Ninja OS101 Foodi Pressure Cooker and Air Fryer',
        price: 129.99,
        rating: 5,
        image: 'https://images-na.ssl-images-amazon.com/images/I/410QLbTnUUL._AC_.jpg',
        imagelist: ['https://images-na.ssl-images-amazon.com/images/I/410QLbTnUUL._AC_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/812RnQxrisL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/81S%2BHiS4BwL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/81lFpn9hbtL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/810gP-ybxHL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/91jAql19MRL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/81BR5Xv2%2B-L._AC_SL1500_.jpg'
        ],
        description: ''
    },
    {
        id: '2',
        title: 'Cosori 5.8qt Air Fryer ',
        price: 89.9,
        rating: 3,
        image: 'https://images-na.ssl-images-amazon.com/images/I/71p5GSQ-BVL._AC_SL1500_.jpg',
        imagelist: ['https://images-na.ssl-images-amazon.com/images/I/71p5GSQ-BVL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/91wB6V1OBEL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71R3oboi-EL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71vfRuCpeLL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/81-5BoV4hNL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/91tE2IOWncL._AC_SL1500_.jpg'
        ],
        description: ''
    },
    {
        id: '3',
        title: 'The Revenge Pact (Kings of Football Book 1)',
        price: 3.99,
        rating: 5,
        image: 'https://m.media-amazon.com/images/I/51FiSHfS+BL._SY346_.jpg',
        imagelist: ['https://m.media-amazon.com/images/I/51FiSHfS+BL._SY346_.jpg'],
        description: ''
    },
    {
        id: '4',
        title: "My Mother's Secret: A Novel Based on a True Holocaust Story",
        price: 1.48,
        rating: 4,
        image: 'https://m.media-amazon.com/images/I/51g72mIimbL.jpg',
        imagelist: ['https://m.media-amazon.com/images/I/51g72mIimbL.jpg'],
        description: ''
    },
    {
        id: '5',
        title: 'A Promised Land',
        price: 17.99,
        rating: 5,
        image: 'https://m.media-amazon.com/images/I/41nzI1lhIVL.jpg',
        imagelist: ['https://m.media-amazon.com/images/I/41nzI1lhIVL.jpg'],
        description: ''
    },
    {
        id: '6',
        title: 'Save up to 30% on Samsung Monitors',
        price: 149.99,
        rating: 4,
        image: 'https://images-na.ssl-images-amazon.com/images/I/71916r38cNL._AC_SL1500_.jpg',
        imagelist: ['https://images-na.ssl-images-amazon.com/images/I/71916r38cNL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/91ubktnbNVL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/91RLPTjVeaL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/919UaTfV0jL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61Jo9aH-8OL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71VyDtO1TCL._AC_SL1500_.jpg'
        ],
        description: ''
    }
]

export const getItemById = id => {
    return PRODUCTS.find(e => e.id === id);
}

export const getProductRating = n => {
    return Array(n).fill().map(e => '⭐');
}