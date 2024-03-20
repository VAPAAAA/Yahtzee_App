import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9', 
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#3498db', 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  footer: {
    marginTop: 10,
    backgroundColor: '#3498db', 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24, 
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16, 
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    flex: 1,
    backgroundColor: '#ffffff', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameinfo: {
    textAlign: 'center',
    fontSize: 16, 
    marginTop: 10,
    marginBottom: 10,
    color: '#555', 
  },
  row: {
    padding: 10,
  },
  flex: {
    flexDirection: "row",
  },
  button: {
    margin: 20, 
    padding: 12, 
    backgroundColor: "#2ecc71", 
    width: 160, 
    borderRadius: 20, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 10,
    width: '80%',
    alignSelf: 'center',
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: "#e74c3c", 
  },
  circleButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  dataTable: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  dataTableCell: {
    padding: 2,
    justifyContent: 'center',
  },
  dataTableTitle: {
    justifyContent: 'center',
    flex: 1,
  },
  dataTableText: {
    fontSize: 12,
  },
  dataTablePlayer: {
    flex: 3,
    justifyContent: 'flex-start',
  },
  dataTableScore: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  dataTableDate: {
    flex: 2,
    justifyContent: 'center',
  },
});
