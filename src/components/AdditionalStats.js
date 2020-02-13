/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  getAdditionalProps,
  getNumEventsTriggered,
} from '../redux/selectors';

import Colors from './data/Colors';

const AdditionalStats = props => (
  <PropContainer>
    <SectionLabel>
      Selected Properties
    </SectionLabel>
    {
      Object.keys(props.additionalProps).map(key => (
        <Row>
          <PropType>{ key }: </PropType>
          <PropVal>{ parseFloat(props.additionalProps[key]).toFixed(3) }</PropVal>
        </Row>
      ))
    }
  </PropContainer>
);

const mapStateToProps = (state) => {
  const additionalProps = getAdditionalProps(state);
  const numEventsTriggered = getNumEventsTriggered(state);
  return {
    additionalProps,
    numEventsTriggered,
  };
};

const PropContainer = styled.div`
  flex-direction: column;
  margin: 15px;
  overflow-y: hidden;
  scrollbar-width: 10px;
`;

const SectionLabel = styled.div`
  margin-bottom: 10px;
  color: ${Colors.white};
  font-size: 3em;
`;

const Row = styled.div`
  margin: 10px 5px;
  color: ${Colors.white};
`;

const PropType = styled.span`
  opacity: .8;
  font-size: 2em;
`;

const PropVal = styled.span`
  opacity: .8;
  font-size: 2em;
`;

export default connect(mapStateToProps)(AdditionalStats);
