from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

#get - consultar informacion
#post - insetar un nuevo registro/elemento
#delete - eliminar un elemento
#put - actualizar completamente un elemento
#patch - actualizar parcialmente

@app.route( "/artistas", methods=["get"])
def ver_artistas():
    db = mysql.connector.connect(
        host='localhost',
        user='root',
        password='12345',
        database='musicfy' 
    )
    
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from artistas")
    
    artistas = cursor.fetchall()
    
    cursor.close()
    return jsonify(artistas)
#--------------------------------------------------------------------------------------------------------------------------
@app.route( "/eliminar_artista/<int:id>", methods=["delete"])
def eliminar_artista(id):
    db = mysql.connector.connect(
        host='localhost',
        user='root',
        password='12345',
        database='musicfy' 
    )
    
    cursor = db.cursor()
    cursor.execute("DELETE FROM artistas WHERE id= %s",(id,))
    db.commit()    
    cursor.close()
    return jsonify({"mensaje":"Eliminado!"})
#--------------------------------------------------------------------------------------------------------------------------
@app.route( "/nuevo_artista", methods=["post"])
def agregar_artista():
    info = request.json
    db = mysql.connector.connect(
        host='localhost',
        user='root',
        password='12345',
        database='musicfy' 
    )
    if isinstance(fecha_formacion, str):
            fecha_formacion = datetime.strptime(fecha_formacion, '%Y-%m-%d').date()
    
    cursor = db.cursor()
    cursor.execute("INSERT INTO artistas (nombre, genero, pais, fecha_formacion) values (%s, %s, %s, %s)", (info["nombre"],info["genero"],info["pais"],info["fecha_formacion"]))
    db.commit()
    cursor.close()
    return jsonify({"mensaje":"Artista agregado con éxito!"})
#--------------------------------------------------------------------------------------------------------------------------
@app.route( "/actualizar_artista<int:id>", methods=["put"])
def actualizar_artista(id):
    info = request.json
    db = mysql.connector.connect(
        host='localhost',
        user='root',
        password='12345',
        database='musicfy' 
    )
    if isinstance(fecha_formacion, str):
            fecha_formacion = datetime.strptime(fecha_formacion, '%Y-%m-%d').date()
    
    cursor = db.cursor()
    cursor.execute("UPDATE artistas SET nombre = %s, genero= %s, pais= %s, fecha_formacion= %s WHERE id = %s", (info["nombre"],info["genero"],info["pais"],info["fecha_formacion"], id))
    db.commit()    
    cursor.close()
    return jsonify({"mensaje":"Artista actualizado con éxito!"})
#--------------------------------------------------------------------------------------------------------------------------
@app.route( "/favoritos", methods=["get"])
def ver_favoritos():
    db = mysql.connector.connect(
        host='localhost',
        user='root',
        password='12345',
        database='musicfy' 
    )
    
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT a.nombre, a.imagen_url, f.href FROM artistas a JOIN Favoritos f ON a.id = f.artista_id;")
    
    favoritos = cursor.fetchall()
    
    cursor.close()
    return jsonify(favoritos)

print(ver_favoritos)
#--------------------------------------------------------------------------------------------------------------------------
@app.route( "/añadir_favorito", methods=["post"])
def agregar_favorito():
    info = request.json
    db = mysql.connector.connect(
        host='localhost',
        user='root',
        password='12345',
        database='musicfy' 
    )
    
    cursor = db.cursor()
    cursor.execute("INSERT INTO Favoritos (artista_id, imagen_url, href) values (%s, %s, %s)", (info["artista_id"],info["imagen_url"],info["href"]))
    db.commit()    
    cursor.close()
    return jsonify({"mensaje":"Favorito agregado con éxito!"})


if __name__ == "__main__":
    app.run(debug=True)