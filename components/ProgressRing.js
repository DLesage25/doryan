import React from 'react';

import { Svg, Circle } from 'react-native-svg';

import { StyleSheet, View } from 'react-native';

const ProgressRing = ({ radius, stroke, progress }) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <View style={styles.ProgressView}>
            <Svg height={radius * 2} width={radius * 2}>
                <Circle
                    stroke="white"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </Svg>
        </View>
    );
};

const ProgressRingStyles = {
    ProgressView: {
        transform: [{ rotate: '-90deg' }],
    },
};

const styles = StyleSheet.create(ProgressRingStyles);

export default ProgressRing;
