import React, { PureComponent } from 'react';
import './Show.css';

class Show extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      showId: this.props.showId
    };
    this.map = {
      house: 118,
      santaBarbara: 5909,
      bigBang: 66
    };

    this.loadData = this.loadData.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);

    if (this.state.showId) this.loadData(this.map[this.state.showId]);
  }

  loadData(showId) {
    let req = new XMLHttpRequest();

    req.open('GET', 'http://api.tvmaze.com/shows/' + showId, true);

    req.onload = () => {
      let result = JSON.parse(req.response);
      this.setState({ data: result, showId: showId });
    };

    req.send();
  }
  componentDidUpdate() {
    if (
      this.props.showId &&
      this.map[this.props.showId] !== this.state.showId
    ) {
      this.loadData(this.map[this.props.showId]);
    }
  }

  render() {
    if (!this.state.data) {
      return false;
    }

    let { name, genres } = this.state.data;
    let summary = this.state.data.summary,
      image = this.state.data.image.medium;

    summary = summary.replace(/<[^>]+>/g, '');
    genres = genres.join(', ');

    return (
      <div className="show">
        <img className="show-image" src={image} alt={name} />
        <h2 className="show-label t-show-name">{name}</h2>
        <p className="show-text t-show-genre">
          <b>Жанр: </b>
          {genres}
        </p>
        <p className="show-text t-show-summary">{summary}</p>
      </div>
    );
  }
}

export default Show;
