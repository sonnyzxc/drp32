import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 40,
  },
  scrollView: {
    paddingVertical: 10,
  },
  noTasksText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
  },
  taskContainer: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginHorizontal: 20, // Add some horizontal margin for better spacing
    padding: 20, // Add padding to create space for the due date text
    position: 'relative', // Position relative for absolute positioning of due date text
  },
  dueDateText: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 5,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
