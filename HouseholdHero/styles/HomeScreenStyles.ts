import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
  subHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  taskContainer: {
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
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  dueDateText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  adminContainer: {
    marginTop: 20,
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
  datePickerButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  datePickerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedDateText: {
    fontSize: 16,
    marginVertical: 10,
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


});
