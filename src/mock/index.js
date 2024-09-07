import Mock from 'mockjs'
import { medalData } from './medalData'



// Complete medal data for 92 countries
const fullMedalList = medalData

// Simulate/alMedalList interface
Mock.mock('/allMedalList', 'get', {
    code: 0,
    message: 'success',
    data: {
        medalList: fullMedalList,
        totalCountries: fullMedalList.length,
        updateTime: Mock.Random.datetime()
    }
})


Mock.mock(/\/getDetailById/, 'get', (options) => {
    //Retrieve the query string parameter from the URL
    const url = new URL(options.url, window.location.origin)
    const id = url.searchParams.get('id') // Get ID parameter
    const medal = fullMedalList.find(medal => medal.countryid === id)

    return {
        code: 0,
        message: 'success',
        data: medal
    }
})

// Simulate/medalList interface (with pagination)
Mock.mock(/\/medalList(\?.+)?/, 'get', (options) => {
    // Resolve URL parameters
    const url = new URL(options.url, 'http://dummy.com')
    const page = parseInt(url.searchParams.get('page') || '1')
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20')

    // Calculate pagination
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedList = fullMedalList.slice(startIndex, endIndex)
    return {
        code: 0,
        message: 'success',
        data: {
            medalList: paginatedList,
            pagination: {
                currentPage: page,
                pageSize: pageSize,
                totalItems: fullMedalList.length,
                totalPages: Math.ceil(fullMedalList.length / pageSize)
            },
            updateTime: Mock.Random.datetime()
        }
    }
})


Mock.mock('/api/users', 'get', {
    'users|10': [{
        'id|+1': 1,
        'name': '@name',
        'email': '@email'
    }]
})


// Simulate/comments interface to generate random comments
Mock.mock('/comments', 'get', {
    code: 0,
    message: 'success',
    'data|10-15': [  // Randomly generate 10 to 15 comments each time
        {
            'id|+1': 1,
            'username': '@name',  // Randomly generate a username using @ name in Mock.js
            'avatar': function() {
                const randomNum = Mock.Random.integer(1, 10);  //Generate random numbers from 1 to 10
                return require(`@/assets/avatar/avatar_${randomNum}.jpg`);  // Use avatars from local resources
            },
            'content': '@sentence(5, 10)',  // Randomly generate a sentence of 5 to 10 words
            'time': '@datetime',  // Randomly generate comment time
        }
    ]
})

