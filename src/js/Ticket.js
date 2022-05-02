export default class Ticket {
  constructor(model) {
    this.model = model;
    this.table = document.querySelector('.products-list');
    this.modalDelete = document.querySelector('.modal-delete');
    this.container = document.querySelector('.modal-container');
  }

  addTicketInTable(tickets) {
    this.table.innerHTML = '';
    tickets.forEach((ticket) => {
      const ticketStatus = document.createElement('td');
      ticketStatus.classList.add('ticket-status');
      if (!ticket.status) {
        ticketStatus.innerHTML = '<i class="far fa-circle fa-lg"></i>';
      } else {
        ticketStatus.innerHTML = ' <i class="far fa-check-circle fa-lg"></i>';
      }

      const ticketItem = document.createElement('tr');
      ticketItem.classList.add('product-item');
      ticketItem.innerHTML = `
               <td class="ticket-name">
                    ${ticket.name}
                    <div class="ticket-description hidden">
                        <i class="fas fa-spinner fa-pulse"></i>
                    </div>
               </td>
                <td class="ticket-created">${ticket.created}</td>
                <td class="ticket-move">
                    <div class="ticket-edit">
                        <i class="far fa-edit fa-lg"></i>
                    </div>
                    <div class="ticket-delete">
                        <i class="far fa-times-circle fa-lg"></i>
                    </div>
                </td>`;

      ticketItem.insertAdjacentElement('afterbegin', ticketStatus);
      this.table.appendChild(ticketItem);
      this.deleteTicket(ticket, ticketItem);
      this.update(ticket, ticketItem);
      this.checkTicket(ticket, ticketStatus);
      this.showDescription(ticket, ticketItem);
    });
  }

  deleteTicket(ticket, elem) {
    elem.querySelector('.ticket-delete').addEventListener('click', () => {
      this.modalDelete.classList.remove('hidden');

      this.modalDelete.addEventListener('reset', () => {
        this.modalDelete.classList.add('hidden');
      });

      this.modalDelete.addEventListener('submit', (e) => {
        e.preventDefault();
        this.model.delete(ticket.id);

        this.modalDelete.classList.add('hidden');
      });
    });
  }

  update(ticket, elem) {
    elem.querySelector('.ticket-edit').addEventListener('click', () => {
      const formEdit = this.model.createForm(this.container);
      formEdit.changeTicket(ticket);
    });
  }

  checkTicket(ticket, circle) {
    circle.addEventListener('click', () => {
      this.model.updateStatus(ticket.id);
    });
  }

  showDescription(ticket, elem) {
    elem.querySelector('.ticket-name').addEventListener('click', () => {
      if (elem.querySelector('.ticket-description').classList.contains('hidden')) {
        elem.querySelector('.ticket-description').classList.remove('hidden');
        this.model.getById(ticket.id).then((data) => {
          const ticketDescription = elem.querySelector('.ticket-description');
          ticketDescription.textContent = data[0].description;
        });
      } else {
        elem.querySelector('.ticket-description').classList.add('hidden');
      }
    });
  }
}
