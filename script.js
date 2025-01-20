const cardGrid = document.getElementById('cards-grid');
const url = 'http://127.0.0.1:5000'
const opt = ['all', 'fav', 'rec'];
const modal = document.getElementById('modal');

document.addEventListener('DOMContentLoaded', () => {
    loadCard();
});


modal.addEventListener('click', (event) => {
    if(event.target === modal){
        closeModal();
    }
});

function loadCard() {
    active('all');
    console.log('loadCard');
    fetch(url+'/link')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.map(item => {
            addCard(item.titolo, item.link, item.descr, item.name, item.id, item.preferito);
        });
    })
}


function addCard(title, link, desc, cat, id, preferito) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    const h3 = document.createElement('h3');
    h3.innerText = title;
    const tag = document.createElement('span');
    tag.classList.add('tag');
    tag.innerText = cat;

    cardHeader.appendChild(h3);
    cardHeader.appendChild(tag);

    const pDesc = document.createElement('p');
    pDesc.innerText = desc + " ";

    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-actions');

    const btnVisit = document.createElement('button');
    btnVisit.classList.add('btn-visit');
    btnVisit.innerText = 'Visit Site';
    btnVisit.addEventListener('click', () => {
        window.open(link, '_blank');
    });

    const btnFav = document.createElement('button');
    btnFav.classList.add('btn-favorite');
    if(preferito===1) {
        btnFav.classList.add('active');
    }
    btnFav.innerText = '★';

    btnFav.addEventListener('click', (event) => {
        event.stopPropagation();
        setPreferiti(id);
    })

    cardFooter.appendChild(btnVisit);
    cardFooter.appendChild(btnFav);

    card.appendChild(cardHeader);
    card.appendChild(pDesc);
    card.appendChild(cardFooter);

    cardGrid.appendChild(card);
}


function setPreferiti(id) {
    fetch(url+'/preferiti/'+id)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.message){
            location.reload();
        }
    })

}


function active(op){
    cardGrid.innerHTML = '';
    opt.map(item => {
        if(item===op){
            document.getElementById(item).classList.add('active');
        } else {
            document.getElementById(item).classList.remove('active');
        }
    });
}

function loadPreferiti() {
    active('fav');
    fetch(url+'/preferiti')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.map(item => {
            if(item.preferito===1){
                addCard(item.titolo, item.link, item.descr, item.name, item.id, item.preferito);
            }
        });
    });
}


function loadRec() {
    active('rec');
    fetch(url+'/rec')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.map(item => {
            addCard(item.titolo, item.link, item.descr, item.name, item.id, item.preferito);
        });
    });
    
}



function openModal() {
    modal.style.display = 'flex';
}


function closeModal() {
    modal.style.display = 'none';
}




function addLink() {
    const link = document.getElementById('site-url').value;
    if(!link){
        alert('Inserisci un link');
        return;
    }

    const title = document.getElementById('site-name').value;
    if(!title){
        alert('Inserisci un titolo');
        return;
    }

    const descr = document.getElementById('site-descr').value;
    const data = new FormData();
    data.append('link', link);
    data.append('title', title);
    data.append('descr', descr);

    fetch(url+'/link', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            link: link,
            title: title,
            descr: descr
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.message){
            location.reload();
        }
        if(data.error){
            alert(data.error);
        }
    })

}

