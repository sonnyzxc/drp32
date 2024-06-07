import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { G, Rect, Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';

const BarGraph: React.FC<{ data: { label: string; users: { value: number; userId: number }[]; }[]; users: { id: number; name: string; color: string }[] }> = ({ data, users }) => {
  const barWidth = 35;
  const chartHeight = 200;
  const padding = 20; // Add padding to the top
  const maxValue = Math.max(...data.flatMap(d => d.users.map(u => u.value))) + padding;
  const scale = maxValue ? (chartHeight - padding) / maxValue : 0; // Adjust for padding

  const todayIndex = new Date().getDay();
  const rotatedData = [...data.slice(todayIndex + 1), ...data.slice(0, todayIndex + 1)];

  return (
    <View style={styles.container}>
      <Svg height={chartHeight + 50} width="100%">
        <Defs>
        {users.map((user, index) => (
            <LinearGradient key={`grad${index}`} id={`grad${user.id}`} x1="0" y1="0" x2="0" y2="100%">
              <Stop offset="0" stopColor={user.color} />
              <Stop offset="1" stopColor={user.color} />
            </LinearGradient>
          ))}
        </Defs>
        <G>
        {rotatedData.map((item, index) => {
            let cumulativeHeight = 0;
            return (
              <React.Fragment key={`bar-${index}`}>
                {(item.users || []).map((user, userIndex) => {
                  const userHeight = user.value * scale;
                  const y = chartHeight - cumulativeHeight - userHeight;
                  cumulativeHeight += userHeight;
                  return (
                    <Rect
                      key={`bar-${index}-${user.userId}`}
                      x={index * (barWidth + 10)}
                      y={y}
                      width={barWidth}
                      height={userHeight}
                      fill={`url(#grad${user.userId})`}
                      rx="5"
                    />
                  );
                })}
                <SvgText
                  key={`label-${index}`}
                  x={index * (barWidth + 10) + barWidth / 2}
                  y={chartHeight + 20}
                  fill="#000"
                  fontSize="12"
                  textAnchor="middle"
                >
                  {item.label}
                </SvgText>
              </React.Fragment>
            );
          })}
        </G>
      </Svg>
      <View style={styles.legend}>
        {users.map((user, index) => (
          <View key={`legend-${user.id}`} style={styles.legendItem}>
            <View style={[styles.legendColorBox, { backgroundColor: user.color }]} />
            <Text style={styles.legendText}>{user.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  legend: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 5,
  },
  legendColorBox: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#333',
  },
});

export default BarGraph;
