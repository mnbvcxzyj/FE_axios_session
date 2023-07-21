import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios'

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom:3rem;
    width: 768px;
    margin: 0 auto;
    margin-top:2rem;

    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left:1rem;
        padding-right:1rem;
    }
`

// const sampleArticle = {
//     title: "제목",
//     description: "내용내용",
//     url: "https://dongduklikelion11.notion.site/11-08ae4329cef34a2d82175207285a43b3",
//     urlToImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcoL08GZ01fSb1T2E1e2bGZ8OYbGGFfmwrsw&usqp=CAU"
// }

const NewsList = ({ category }) => {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);
    // 요청 대기 : true, 요청 끝 : false

    useEffect(() => {
        // async 사용을 위해 따로 함수 선언
        const fetchData = async () => {
            setLoading(true); // 요청 대기 
            try {
                const query = category === 'all' ? '' : `&category=${category}`;
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=518f6695ec6c464ebe355ccb17bf33e9`,
                );
                setArticles(response.data.articles);
            } catch (e) {
                console.log(e)
            };
            setLoading(false); // 요청 끝
        };
        fetchData();
    }, [category])

    // 대기 중인 상태라면 
    if (loading) {
        return <NewsListBlock>대기중...</NewsListBlock>
    }

    // article 값이 없을 때
    if (!articles) {
        return null;
    }

    // article 값이 있을 때
    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    );
};

export default NewsList;