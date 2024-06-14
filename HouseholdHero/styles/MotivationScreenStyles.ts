import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 60,
    zIndex: 1, // Ensure that the header text is rendered above other elements
  },
  scrollViewContainer: {
    flex: 1, // Ensure that the scrollable content takes up the remaining space
  },
  dayContainer: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceImage: {
    width: 150,
    height: 150,
  },
  dateText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  miniMapContainer: {
    position: 'absolute',
    top: 100, // Adjust the top position to leave space for the header text
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure that the minimap is rendered above the header text
  },
  miniMapItem: {
    marginHorizontal: 5,
  },
  selectedMiniMapItem: {
    backgroundColor: '#bdbdbd',
    borderRadius: 15,
    padding: 5,
  },
  miniFaceImage: {
    width: 30,
    height: 30,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',  // Ensure text is aligned to the top
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginHorizontal: 15, // Add margin horizontally
  },
  taskTextContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flexWrap: 'wrap',
    flex: 1,  // Ensure text takes available space
  },
  dueDateText: {
    fontSize: 14,
    color: 'gray',
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth * 0.8,
    marginVertical: 20,
  },
  navigationText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  monthText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: screenWidth * 0.9,
  },
  emptyDayContainer: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    margin: screenWidth * 0.02,
  },
});

export default styles;
