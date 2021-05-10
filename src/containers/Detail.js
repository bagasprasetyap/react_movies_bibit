import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Card,
} from 'antd';
import { actions as actionMovie } from '../redux/movie';

const { Meta } = Card;

const mapStateToProps = (state) => {
  return {
    detailMovie: state.movie.successDetail,
    isLoading: state.movie.isLoadingDetail,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMovieDetail: (data) => dispatch(actionMovie.getMovieDetail(data)),
  }
}

const Detail = (props) => {
  const { getMovieDetail, match, detailMovie } = props;
  useEffect(() => {
    getMovieDetail({ id: match.params.movie_id, plot: 'full' })
  }, [getMovieDetail, match]);

  if (detailMovie) {
    return (
      <>
        <Row gutter={8}>
          <Col span={12} offset={6} style={{ marginBottom: 20 }}>
            <h3>Movies Detail</h3>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12} offset={6} style={{ marginBottom: 20 }}>
            <Card
              hoverable
              style={{ width: '80%' }}
              cover={<img alt="example" src={detailMovie.Poster} />}
            >
              <Meta title={`${detailMovie.Title} - ${detailMovie.Year}`} description={detailMovie.Plot} />
              <Meta title={`Cast: ${detailMovie.Actors}`} />
            </Card>
          </Col>
        </Row>
      </>
    )
  }
  return null;


}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);