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
  historyButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  historyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    flexWrap: 'wrap',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
  dueDateText: {
    fontSize: 14,
    color: 'gray',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    zIndex: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  adminContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  pointsLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pointsLabelText: {
    fontSize: 14,
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pointBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedPointBox: {
    backgroundColor: '#007AFF',
  },
  pointText: {
    fontSize: 16,
    color: '#333',
  },
  datePickerButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  datePickerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedDateText: {
    fontSize: 16,
    marginBottom: 10,
  },
  userPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  userOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedUser: {
    backgroundColor: '#007AFF',
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default styles;
