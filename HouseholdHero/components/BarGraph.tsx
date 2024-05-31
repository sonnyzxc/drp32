import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { G, Rect, Defs, LinearGradient, Stop, Text } from 'react-native-svg';
import Animated from 'react-native-reanimated';

const BarGraph: React.FC<{ data: { label: string; value: number }[] }> = ({ data }) => {
  const barWidth = 35;
  const chartHeight = 200;
  const maxValue = Math.max(...data.map(d => d.value));
  const scale = chartHeight / (maxValue || 1); // Ensure scale is not NaN

  return (
    <View style={styles.container}>
      <Svg height={chartHeight + 50} width="100%">
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="100%">
            <Stop offset="0" stopColor="#6a11cb" />
            <Stop offset="1" stopColor="#2575fc" />
          </LinearGradient>
        </Defs>
        <G>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <Rect
                x={index * (barWidth + 10)}
                y={chartHeight - item.value * scale}
                width={barWidth}
                height={item.value * scale || 0} // Ensure height is not NaN
                fill="url(#grad)"
                rx="5"
              />
              <Text
                x={index * (barWidth + 10) + barWidth / 2}
                y={chartHeight + 20}
                fill="#000"
                fontSize="12"
                textAnchor="middle"
              >
                {item.label}
              </Text>
            </React.Fragment>
          ))}
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default BarGraph;
