import Model from './Model';
import Form from './Form';
import Ticket from './Ticket';

const serverResponse = new Model();

const addTicket = document.querySelector('.btn-add');
const modalContainer = document.querySelector('.modal-container');

document.addEventListener('DOMContentLoaded', () => {
  const allTickets = serverResponse.getAll();

  allTickets.then((data) => {
    const showTicket = new Ticket(serverResponse);
    showTicket.addTicketInTable(data);
  });
});

addTicket.addEventListener('click', () => {
  const addForm = new Form(modalContainer, serverResponse);
  addForm.createForm('Добавить тикет');
  addForm.submitForm();
});
