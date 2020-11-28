const News = require('../models/news')
const { Op } = require("sequelize")
const UserService = require('./user')

//FIXME: This method should return only non-draft news
const getAllNewsShow = async () => {
    let dbNews = await News.findAll()
    if(dbNews === undefined) {
        return {
            status: 404,
            data: []
        }
    }
    let newsList = []
    for(let i = 0; i<dbNews.length; i++) {
        let news = dbNews[i].dataValues
        newsList.push({
            id: news.id,
            title: news.title,
            slug: news.slug,
            extract: news.extract,
            full_text: news.full_text,
            author: await UserService.getUserById(news.user_id),
            source: {
                name: news.source_name,
                url: news.source_url
            },
            via: {
                name: news.via_name,
                url: news.via_url
            },
            draft: news.draft,
            featured: news.featured,
            createdAt: news.createdAt,
            updatedAt: news.updatedAt
        })
    }

    return {
        status: 200,
        data: newsList
    }
}

const getAllNews = async () => {
    let dbNews = await News.findAll()
    if(dbNews === undefined) {
        return {
            status: 404,
            data: []
        }
    }
    let newsList = []
    for(let i = 0; i<dbNews.length; i++) {
        let news = dbNews[i].dataValues
        newsList.push({
            id: news.id,
            title: news.title,
            slug: news.slug,
            extract: news.extract,
            full_text: news.full_text,
            author: await UserService.getUserById(news.user_id),
            source: {
                name: news.source_name,
                url: news.source_url
            },
            via: {
                name: news.via_name,
                url: news.via_url
            },
            draft: news.draft,
            featured: news.featured,
            createdAt: news.createdAt,
            updatedAt: news.updatedAt
        })
    }

    return {
        status: 200,
        data: newsList
    }
}

module.exports = {
    getAllNewsShow,
    getAllNews
}