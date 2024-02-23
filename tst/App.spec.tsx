/**
 * Copyright (c) 2022 Amazon.com, Inc. or its affiliates.  All rights reserved.
 *
 * PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.
 */
import 'react-native';

import {fireEvent, render} from '@testing-library/react-native';
import * as React from 'react';

import {ComAmazonBitmovinplayerwebsamplekeplerMain} from '../src/App';

describe('Template App Snapshot tests', () => {
  it('Initial App screen', () => {
    // prettier-ignore
    const screen = render(<ComAmazonBitmovinplayerwebsamplekeplerMain />);
    expect(screen).toMatchSnapshot();
  });
  it('App screen after button press', () => {
    // prettier-ignore
    const screen = render(<ComAmazonBitmovinplayerwebsamplekeplerMain />);
    const button = screen.getByTestId('sampleButton');
    fireEvent.press(button);
    expect(screen).toMatchSnapshot();
  });
});
