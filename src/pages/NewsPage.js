import React from 'react';
import Categories from '../components/Categories';
import NewsList from '../components/NewsList';
import { useParams } from 'react-router-dom';

const NewsPage = () => {
    // useParams 훅을 사용하여 category 매개변수를 가져옴
    const { category } = useParams();
    // category 값이 존재하면 해당 값을, 없다면 기본값 'all'을 selectedCategory로 설정
    const selectedCategory = category || 'all'

    console.log(category)

    // const category = match.params.category || 'all';
    return (
        <div>
            <Categories />
            <NewsList category={selectedCategory} />
        </div>
    );
};

export default NewsPage;