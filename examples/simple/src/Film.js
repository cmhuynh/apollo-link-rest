import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import isDate from 'date-fns/isDate';

const Query = gql`
  query hope {
    film @rest(type: "Film", path: "films/1/") {
      title
      release_date
    }
  }
`;

class Film extends Component {
  render() {
    const { loading, error, film } = this.props;
    if (loading) {
      return <h4>Loading...</h4>;
    }
    if (error) {
      return <h4>{error.message}</h4>;
    }

    const dateParsed = isDate(film.release_date);
    console.log(`film.release_date = ${film.release_date} >>> isDate(film.release_date) = ${dateParsed} `);

    return <h1>release_date = {film.release_date}</h1>;
  }
}
export default graphql(Query, {
  props: ({ data }) => {
    if (data.loading) {
      return {
        loading: data.loading,
      };
    }

    if (data.error) {
      return {
        error: data.error,
      };
    }
    return {
      film: data.film,
      loading: false,
    };
  },
})(Film);
