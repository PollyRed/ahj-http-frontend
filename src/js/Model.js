import Ticket from './Ticket';
import Form from './Form';

export default class Model {
  constructor() {
    this.serverURL = 'https://ahj-http-server.herokuapp.com';
  }

  start() {
    const allTickets = this.getAll();

    allTickets.then((data) => {
      const showTicket = new Ticket(this);
      showTicket.addTicketInTable(data);
    });
  }

  createForm(container) {
    return new Form(container, this);
  }

  async getAll() {
    const tickets = await fetch(`${this.serverURL}?method=allTickets`);
    return tickets.json();
  }

  async save(formData) {
    const ticket = {
      name: formData.get('name'),
      description: formData.get('description'),
    };

    await fetch(`${this.serverURL}/?method=createTicket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(ticket),
    });

    this.start();
  }

  async delete(id) {
    await fetch(`${this.serverURL}?method=deleteTicket&id=${id}`);
    this.start();
  }

  async getById(id) {
    const tickets = await fetch(`${this.serverURL}?method=ticketById&id=${id}`);
    return tickets.json();
  }

  async update(formData, id) {
    const ticket = {
      name: formData.get('name'),
      description: formData.get('description'),
      id,
    };

    await fetch(`${this.serverURL}/?method=changeTicket&id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(ticket),
    });

    this.start();
  }

  async updateStatus(id) {
    await fetch(`${this.serverURL}/?method=changeStatus&id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ id }),
    });

    this.start();
  }
}
