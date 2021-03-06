/**
 * Container helper using react-meteor-data.
 */

import createClass from 'create-react-class';
//import React from 'react';
import {h, render} from 'preact';

/** @jsx h */

import PureRenderMixin from 'react-addons-pure-render-mixin';

import ReactMeteorData from './ReactMeteorData';

export default function createContainer(options = {}, Component) {
  let expandedOptions = options;
  if (typeof options === 'function') {
    expandedOptions = {
      getMeteorData: options,
    };
  }

  const {
    getMeteorData,
    pure = true,
  } = expandedOptions;

  const mixins = [ReactMeteorData];
  if (pure) {
    mixins.push(PureRenderMixin);
  }

  /* eslint-disable react/prefer-es6-class */
  return createClass({
    displayName: 'MeteorDataContainer',
    mixins,
    getMeteorData() {
      return getMeteorData(this.props);
    },
    render() {
      return <Component {...this.props} {...this.data} />;
    },
  });
}
