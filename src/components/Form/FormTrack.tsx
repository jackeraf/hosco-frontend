import React, { Component } from "react";
import styled from "styled-components";
import { colors } from "styles/styled-components/colors";

const InputTrack = styled.input`
  height: 85%;
  background-color: #282828;
  border: solid 1px #b3b3b3;
  color: #b3b3b3;
`;

const InputSubmit = styled.input`
  background-color: ${colors.spotify};
`;
type Props = JSX.IntrinsicElements["form"];

interface IFormTrack extends Props {
  handleSearch: (event: { preventDefault: () => void }) => void;
}

interface IInputTrack {
  value: string | number | string[] | undefined;
  onChange:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
};

class FormTrack extends Component<IFormTrack, {}> {
  constructor(props: IFormTrack) {
    super(props);
  }
  static InputTrack = (props: IInputTrack) => (
    <InputTrack type="text" name="name" {...props} />
  );
  static InputSubmit = () => (
    <input type="submit" className="btn btn-spotify" value="Search" />
  );
  static ButtonWarning = (props: { handleCleanSearch: () => void }) => (
    <button
      className="btn btn-warning"
      onClick={() => props.handleCleanSearch()}
    >
      <i className="fa fa-refresh" />
      Clean Search
    </button>
  );
  render() {
    return (
      <form onSubmit={this.props.handleSearch} {...this.props}>
        {this.props.children}
      </form>
    );
  }
}

export default FormTrack;
