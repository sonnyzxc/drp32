import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollView: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  subHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  userPicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  userButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#007AFF',
  },
  selectedUserButton: {
    backgroundColor: '#005BBB',
  },
  userButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedUserButtonText: {
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  totalPointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
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
});

export default styles;