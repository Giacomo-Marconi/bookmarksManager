from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS 
from cred import db_config

app = Flask(__name__)




CORS(app)


@app.route('/link', methods=['POST'])
def add_link():
    data = request.json
    link = data.get('link')
    titolo = data.get('title')
    descrizione = data.get('descr')
    id_user = 1 

    if not (link and titolo):
        return jsonify({'error': 'All fields are required!'}), 400
    
    if(not descrizione):
        descrizione = ""

    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = """INSERT INTO links (link, titolo, descr, idUser) 
                   VALUES (%s, %s, %s, %s)"""
        cursor.execute(query, (link, titolo, descrizione, id_user))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'message': 'Link added successfully!'}), 201
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

@app.route('/link', methods=['GET'])
def get_links():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        query = "SELECT l.*, c.name FROM links l, categories c WHERE l.cat = c.id"
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(result), 200
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

@app.route('/preferiti', methods=['GET'])
def get_prefered():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        query = "SELECT l.*, c.name FROM links l, categories c WHERE l.cat = c.id AND l.preferito = 1"
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(result), 200
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500


@app.route('/preferiti/<int:id>', methods=['GET'])
def setPreferito(id):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = "UPDATE links SET preferito = (1-(SELECT preferito where id = %s)) WHERE id = %s"
        cursor.execute(query, (id, id))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'message': 'Link added to preferiti!'}), 200
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500


@app.route('/rec', methods=['GET'])
def recenti():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        query = "SELECT l.*, c.name FROM links l, categories c WHERE l.cat = c.id ORDER BY l.id DESC LIMIT 9"
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(result), 200
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

if __name__ == '__main__':
    app.run(debug=True)




