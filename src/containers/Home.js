import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  List,
  Skeleton,
  Avatar,
  Input,
  message,
} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { actions as actionMovie } from '../redux/movie';
import { apiMovie } from '../api';
import { notification } from '../components/index';

const { Search } = Input;

const mapStateToProps = (state) => {
  return {
    listMovie: state.movie.success,
    isLoading: state.movie.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMovieList: (data) => dispatch(actionMovie.getMovieList(data)),
  }
}

const Home = (props) => {
  const { getMovieList, listMovie, isLoading } = props;

  const [dataList, setDataList] = useState([]);
  const [dataTotal, setDataTotal] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    if (listMovie) {
      const newDataList = listMovie.Search;
      const newDataTotal = listMovie.totalResults;
      setDataList(newDataList);
      setDataTotal(newDataTotal);
    }
  }, [listMovie]);

  const handleSearchBar = (val) => {
    setTitle(val);
    getMovieList({ title: val });
  }

  const handleInfiniteOnLoad = (data) => {
    if (dataList.length < dataTotal) {
      setHasMore(true);
      handleScroll(data);
    } else if (dataList.length === dataTotal) {
      message.warning('Infinite List loaded all');
      setHasMore(false);
    }
  }

  const handleScroll = async (page) => {
    try {
      const resp = await apiMovie({ title: title, page: page });
      if (resp.Response === 'True') {
        const newDataList = dataList.concat(resp.Search);
        setDataList(newDataList);
        setDataTotal(resp.totalResults);
      } else {
        notification('error', resp.Error);
      }
    } catch (err) {
      console(err);
    }
  }

  return (
    <>
      <Row gutter={8}>
        <Col span={12} offset={6} style={{ marginBottom: 20 }}>
          <h3>Search Bar</h3>
          <Search
            placeholder="Input Movie Title"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={(val) => handleSearchBar(val)}
          />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12} offset={6} style={{ marginBottom: 20 }}>
          <h3>List Movie</h3>
          <InfiniteScroll
            initialLoad={false}
            pageStart={1}
            loadMore={(data) => handleInfiniteOnLoad(data)}
            hasMore={hasMore}
          // isReverse={false}
          >
            <List
              className="listMovies"
              loading={isLoading}
              itemLayout="horizontal"
              dataSource={dataList}
              renderItem={item => (
                <List.Item>
                  <Skeleton avatar title={false} loading={isLoading} active>
                    <List.Item.Meta
                      avatar={<Avatar src={item.Poster} />}
                      title={<a href={`/detail/${item.imdbID}`} >{item.Title}</a>}
                      description={`${item.Type} - ${item.Year}`}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </Col>
      </Row>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);