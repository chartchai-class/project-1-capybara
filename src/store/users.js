import { defineStore } from 'pinia'
import axios from 'axios'

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [],
        allList: [],
        medalList:[],
        pagination: {
            currentPage: 1,
            pageSize: 20,
            totalItems: 0,
            totalPages: 0
        },
        updateTime: '',
        comments: [], // Add comment data storage
    }),
    actions: {
        async fetchUsers() {
            try {
                const response = await axios.get('/api/users')
                this.users = response.data.users
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        },
        async fetchAllList() {
            try {
                const response = await axios.get('/medalList')
                this.allList = response.data.data.medalList
            } catch (error) {
                console.error('Error fetching all list:', error)
            }
        },
        async fetchMedalList(page = 1, pageSize = 10) {
            try {
                const response = await axios.get(`/medalList?page=${page}&pageSize=${pageSize}`)
                this.medalList = response.data.data.medalList
                this.pagination = response.data.data.pagination
                this.updateTime = response.data.data.updateTime
            } catch (error) {
                console.error('Error fetching medal list:', error)
            }
        },
        async fetchDetailById(id) {
            try {
                const response = await axios.get('/getDetailById', {
                    params: { id:id }
                })
                return response.data.data
            } catch (error) {
                console.error('Error fetching detail by id:', error)
            }
        },
        async fetchComments() {
            try {
                const response = await axios.get('/comments')
                return response.data.data // Store comment data
            } catch (error) {
                console.error('Error fetching comments:', error)
            }
        }
    }
})
