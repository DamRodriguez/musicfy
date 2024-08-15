from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuración de conexión a la base de datos
db_config = {
    'host': '',   # (está puesto en pythonanywhere)
    'user': '',
    'password': '',
    'database': ''
}

# Endpoint para consultar todos los artistas
@app.route("/artistas", methods=["GET"])
def ver_artistas():
    db = mysql.connector.connect(**db_config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM artistas")
    artistas = cursor.fetchall()
    cursor.close()
    return jsonify(artistas)

# Endpoint para eliminar un artista por ID
@app.route("/eliminar_artista/<int:id>", methods=["DELETE"])
def eliminar_artista(id):
    db = mysql.connector.connect(**db_config)
    cursor = db.cursor()
    cursor.execute("DELETE FROM artistas WHERE id = %s", (id,))
    db.commit()
    cursor.close()
    return jsonify({"mensaje": "Artista eliminado!"})

# Endpoint para agregar un nuevo artista
@app.route("/nuevo_artista", methods=["POST"])
def agregar_artista():
    info = request.json
    fecha_formacion = info.get("fecha_formacion")
    if isinstance(fecha_formacion, str):
        fecha_formacion = datetime.strptime(fecha_formacion, '%Y-%m-%d').date()

    db = mysql.connector.connect(**db_config)
    cursor = db.cursor()
    cursor.execute("INSERT INTO artistas (nombre, genero, pais, fecha_formacion) VALUES (%s, %s, %s, %s)",
                   (info["nombre"], info["genero"], info["pais"], fecha_formacion))
    db.commit()
    cursor.close()
    return jsonify({"mensaje": "Artista agregado con éxito!"})

# Endpoint para actualizar un artista por ID
@app.route("/actualizar_artista/<int:id>", methods=["PUT"])
def actualizar_artista(id):
    info = request.json
    fecha_formacion = info.get("fecha_formacion")
    if isinstance(fecha_formacion, str):
        fecha_formacion = datetime.strptime(fecha_formacion, '%Y-%m-%d').date()

    db = mysql.connector.connect(**db_config)
    cursor = db.cursor()
    cursor.execute("UPDATE artistas SET nombre = %s, genero = %s, pais = %s, fecha_formacion = %s WHERE id = %s",
                   (info["nombre"], info["genero"], info["pais"], fecha_formacion, id))
    db.commit()
    cursor.close()
    return jsonify({"mensaje": "Artista actualizado con éxito!"})


@app.route("/favoritos", methods=["GET"])
def ver_favoritos():
    try:
        # Conexión a la base de datos
        db = mysql.connector.connect(**db_config)
        cursor = db.cursor(dictionary=True)

        # Actualizar la tabla Favoritos antes de hacer la consulta SELECT
        update_query = """
        UPDATE Favoritos f
        JOIN artistas a ON f.artista_id = a.id
        SET f.imagen_url = a.imagen_url
        """
        cursor.execute(update_query)
        db.commit()

        # Consulta para obtener los favoritos con sus nombres e imagen_url
        select_query = """
        SELECT a.id, a.nombre, a.imagen_url, f.href
        FROM artistas a
        JOIN Favoritos f ON a.id = f.artista_id
        """
        cursor.execute(select_query)
        favoritos = cursor.fetchall()

        cursor.close()
        db.close()

        # Convertir resultado a JSON y devolverlo
        return jsonify(favoritos)

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/añadir_favorito", methods=["POST"])
def agregar_favorito():
    info = request.json
    db = mysql.connector.connect(**db_config)

    try:
        cursor = db.cursor()

        # Verificar si el registro ya existe
        check_query = "SELECT COUNT(*) FROM Favoritos WHERE artista_id = %s AND imagen_url = %s AND href = %s"
        cursor.execute(check_query, (info["artista_id"], info["imagen_url"], info["href"]))
        result = cursor.fetchone()

        if result[0] > 0:
            mensaje = {"mensaje": info.get("mensaje_existente")}
            status_code = 409
        else:
            # Insertar si no existe
            insert_query = "INSERT INTO Favoritos (artista_id, imagen_url, href) VALUES (%s, %s, %s)"
            cursor.execute(insert_query, (info["artista_id"], info["imagen_url"], info["href"]))
            db.commit()
            mensaje = {"mensaje": info.get("mensaje_exito")}
            status_code = 200
    except mysql.connector.Error as err:
        print(f"Error en la base de datos: {err}")
        mensaje = {"mensaje": f"Error: {err}"}
        status_code = 500
    except Exception as e:
        print(f"Error desconocido: {e}")
        mensaje = {"mensaje": f"Error: {e}"}
        status_code = 500
    finally:
        cursor.close()
        db.close()

    return jsonify(mensaje), status_code


@app.route( "/eliminar_favorito/<int:id>", methods=["delete"])
def eliminar_favorito(id):
    db = mysql.connector.connect(**db_config)

    cursor = db.cursor()
    cursor.execute("DELETE FROM Favoritos WHERE artista_id= %s",(id,))
    db.commit()
    cursor.close()
    return jsonify({"mensaje":"Eliminado!"})


if __name__ == "__main__":
    app.run(debug=True)
    
    
    