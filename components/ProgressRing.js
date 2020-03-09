import React from 'react';
import { Svg, Circle } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const ProgressRing = ({ radius, stroke, progress, color }) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const strokeColor = color || '#fcfcfc';
    return (
        <View style={styles.ProgressView}>
            <Svg height={radius * 2} width={radius * 2}>
                <Circle
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset, stroke: strokeColor }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </Svg>
        </View>
    );
};

ProgressRing.propTypes = {
    radius: PropTypes.number,
    stroke: PropTypes.number,
    progress: PropTypes.number,
    color: PropTypes.string,
};

ProgressRing.defaultProps = {
    radius: 10,
    stroke: 10,
    progress: 10,
};

const ProgressRingStyles = {
    ProgressView: {
        transform: [{ rotate: '-90deg' }],
    },
};

const styles = StyleSheet.create(ProgressRingStyles);

export default ProgressRing;
