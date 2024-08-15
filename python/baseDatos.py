import mysql.connector
from datetime import datetime

def conectar():
    
    conexion = mysql.connector.connect(
        host='localhost',
        user='root', 
        password='12345', 
        database='musicfy' 
        
    )
    return conexion

def desconectar(conexion):
    
    if conexion:
        conexion.close()
#--------------------------------------------------------------------------------------------------------------------------
def agregar_artista(nombre, genero, pais, fecha_formacion):
    try: 
        conexion = conectar()
        cursor = conexion.cursor()

        if isinstance(fecha_formacion, str):
            fecha_formacion = datetime.strptime(fecha_formacion, '%Y-%m-%d').date()

        query = "INSERT INTO artistas (nombre, genero, pais, fecha_formacion) VALUES (%s, %s, %s, %s)"
        datos_artista = (nombre, genero, pais, fecha_formacion)
        cursor.execute(query, datos_artista)

        conexion.commit() 
        cursor.close() 
        print("Artista agregado con éxito!")

    except mysql.connector.Error as error:
        print(f"Error al agregar el artista -> {error}")

    finally:
        desconectar(conexion)
#--------------------------------------------------------------------------------------------------------------------------
def agregar_album(titulo, id_artista, fecha_lanzamiento):
    try:
        conexion = conectar()
        cursor = conexion.cursor()
        
        if isinstance(fecha_lanzamiento, str):
            fecha_lanzamiento = datetime.strptime(fecha_lanzamiento, '%Y-%m-%d').date()

        query = "INSERT INTO albums (titulo, id_artista, fecha_lanzamiento) VALUES (%s, %s, %s)"
        datos_album = (titulo, id_artista, fecha_lanzamiento)
        cursor.execute(query, datos_album)

        conexion.commit()
        cursor.close() 
        print("Album agregado con éxito!")

    except mysql.connector.Error as error:
        print(f"Error al agregar el album -> {error}")

    finally:
        desconectar(conexion)
#--------------------------------------------------------------------------------------------------------------------------   
def agregar_cancion(titulo, duracion, id_album):
    try:
        conexion = conectar()
        cursor = conexion.cursor()
        
        if isinstance(duracion, str):
            duracion = datetime.strptime(duracion, '%H:%M:%S').time()

        query = "INSERT INTO canciones (titulo, duracion, id_album) VALUES (%s, %s, %s)"
        datos_cancion = (titulo, duracion, id_album)
        cursor.execute(query, datos_cancion)

        conexion.commit()
        cursor.close() 
        print("Canción agregada con éxito!")

    except mysql.connector.Error as error:
        print(f"Error al agregar la canción -> {error}")

    finally:
        desconectar(conexion)
#--------------------------------------------------------------------------------------------------------------------------
def agregar_tendencia(titulo, descripcion):
    try:
        conexion = conectar()
        cursor = conexion.cursor()

        query = "INSERT INTO tendencias (titulo, descripcion) VALUES (%s, %s)"
        datos_tendencia = (titulo, descripcion)
        cursor.execute(query, datos_tendencia)

        conexion.commit()
        cursor.close() 
        print("Tendencia agregada con éxito!")

    except mysql.connector.Error as error:
        print(f"Error al agregar la tendencia -> {error}")

    finally:
        desconectar(conexion)
#--------------------------------------------------------------------------------------------------------------------------   
def ver_artistas():
    try:
        conexion = conectar()
        cursor = conexion.cursor()

        query = "SELECT * FROM artistas"
        cursor.execute(query)
        artistas = cursor.fetchall() 

        cursor.close()
        return artistas

    except mysql.connector.Error as error:
        print(f"Error al obtener los artistas -> {error}")

    finally:
        desconectar(conexion)
#--------------------------------------------------------------------------------------------------------------------------        
def ver_albums():
    try:
        conexion = conectar()
        cursor = conexion.cursor()

        query = "SELECT * FROM albums"
        cursor.execute(query)
        albums = cursor.fetchall() 

        cursor.close()
        return albums

    except mysql.connector.Error as error:
        print(f"Error al obtener los albums -> {error}")

    finally:
        desconectar(conexion)
#--------------------------------------------------------------------------------------------------------------------------
def ver_canciones():
    try:
        conexion = conectar()
        cursor = conexion.cursor()

        query = "SELECT * FROM canciones"
        cursor.execute(query)
        canciones = cursor.fetchall() 

        cursor.close()
        return canciones

    except mysql.connector.Error as error:
        print(f"Error al obtener las canciones -> {error}")

    finally:
        desconectar(conexion)
#--------------------------------------------------------------------------------------------------------------------------
def ver_tendencias():
    try:
        conexion = conectar()
        cursor = conexion.cursor()

        query = "SELECT * FROM tendencias"
        cursor.execute(query)
        tendencias = cursor.fetchall() 

        cursor.close()
        return tendencias

    except mysql.connector.Error as error:
        print(f"Error al obtener las tendencias -> {error}")

    finally:
        desconectar(conexion)
#--------------------------------------------------------------------------------------------------------------------------
def eliminar_artista(id_artista):
    try:
        conexion = conectar()
        cursor = conexion.cursor()

        query = "DELETE FROM artistas WHERE id = %s"
        dato_artista = (id_artista,)
        cursor.execute(query, dato_artista)

        conexion.commit()
        cursor.close()
        print(f"Artista con id {id_artista} eliminado con exito!")

    except mysql.connector.Error as error:
        print(f"Error al eliminar el artista -> {error}")

    finally:
        desconectar(conexion)
#--------------------------------------------------------------------------------------------------------------------------
def eliminar_album(id_album):
    try:
        conexion = conectar()
        cursor = conexion.cursor()

        query = "DELETE FROM albums WHERE id = %s"
        dato_album = (id_album,)
        cursor.execute(query, dato_album)

        conexion.commit()
        cursor.close()
        print(f"Album con id {id_album} eliminado con exito!")

    except mysql.connector.Error as error:
        print(f"Error al eliminar el album -> {error}")

    finally:
        desconectar(conexion)
#--------------------------------------------------------------------------------------------------------------------------
def eliminar_cancion(id_cancion):
    try:
        conexion = conectar()
        cursor = conexion.cursor()

        query = "DELETE FROM canciones WHERE id = %s"
        dato_cancion = (id_cancion,)
        cursor.execute(query, dato_cancion)

        conexion.commit()
        cursor.close()
        print(f"Canción con id {id_cancion} eliminada con exito!")

    except mysql.connector.Error as error:
        print(f"Error al eliminar la canción -> {error}")

    finally:
        desconectar(conexion)
#--------------------------------------------------------------------------------------------------------------------------
def eliminar_tendencia(id_tendencia):
    try:
        conexion = conectar()
        cursor = conexion.cursor()

        query = "DELETE FROM tendencias WHERE id = %s"
        dato_tendencia = (id_tendencia,)
        cursor.execute(query, dato_tendencia)

        conexion.commit()
        cursor.close()
        print(f"Tendencia con id {id_tendencia} eliminada con exito!")

    except mysql.connector.Error as error:
        print(f"Error al eliminar la tendencia -> {error}")

    finally:
        desconectar(conexion)
#--------------------------------------------------------------------------------------------------------------------------
def actualizar_artista(id_artista, nombre, genero, pais, fecha_formacion):
    try:
        conexion = conectar()
        cursor = conexion.cursor()

        if isinstance(fecha_formacion, str):
            fecha_formacion = datetime.strptime(fecha_formacion, '%Y-%m-%d').date()

        query = "UPDATE artistas SET nombre = %s, genero = %s, pais = %s, fecha_formacion = %s WHERE id = %s"
        datos_artista = (nombre, genero, pais, fecha_formacion, id_artista)
        cursor.execute(query, datos_artista)

        conexion.commit()
        cursor.close()
        print(f"Artista con ID {id_artista} actualizado con éxito!")

    except mysql.connector.Error as error:
        print(f"Error al actualizar el artista -> {error}")

    finally:
        desconectar(conexion)
#--------------------------------------------------------------------------------------------------------------------------
def actualizar_album(id_album, titulo, id_artista, fecha_lanzamiento):
    try:
        conexion = conectar()
        cursor = conexion.cursor()

        if isinstance(fecha_lanzamiento, str):
            fecha_lanzamiento = datetime.strptime(fecha_lanzamiento, '%Y-%m-%d').date()

        query = "UPDATE albums SET titulo = %s, id_artista = %s, fecha_lanzamiento = %s WHERE id = %s"
        datos_album = (titulo, id_artista, fecha_lanzamiento, id_album)
        cursor.execute(query, datos_album)

        conexion.commit()
        cursor.close()
        print(f"Album con ID {id_album} actualizado con éxito!")

    except mysql.connector.Error as error:
        print(f"Error al actualizar el album -> {error}")

    finally:
        desconectar(conexion)
#--------------------------------------------------------------------------------------------------------------------------
def actualizar_cancion(id_cancion, titulo, duracion, id_album):
    try:
        conexion = conectar()
        cursor = conexion.cursor()

        if isinstance(duracion, str):
            duracion = datetime.strptime(duracion, '%H:%M:%S').time()

        query = "UPDATE canciones SET titulo = %s, duracion = %s, id_album = %s WHERE id = %s"
        datos_cancion = (titulo, duracion, id_album, id_cancion)
        cursor.execute(query, datos_cancion)

        conexion.commit()
        cursor.close()
        print(f"Canción con ID {id_cancion} actualizada con éxito!")

    except mysql.connector.Error as error:
        print(f"Error al actualizar la canción -> {error}")

    finally:
        desconectar(conexion)
#--------------------------------------------------------------------------------------------------------------------------
def actualizar_tendencia(id_tendencia, titulo, descripcion):
    try:
        conexion = conectar()
        cursor = conexion.cursor()

        query = "UPDATE tendencias SET titulo = %s, descripcion = %s WHERE id = %s"
        datos_tendencia = (titulo, descripcion, id_tendencia)
        cursor.execute(query, datos_tendencia)

        conexion.commit()
        cursor.close()
        print(f"Tendencia con ID {id_tendencia} actualizada con éxito!")

    except mysql.connector.Error as error:
        print(f"Error al actualizar la tendencia -> {error}")

    finally:
        desconectar(conexion)
#--------------------------------------------------------------------------------------------------------------------------
def mostrar_todo():
    try:
        conexion = conectar()
        cursor = conexion.cursor()

        query = "SELECT artistas.id AS id_artista, artistas.nombre, artistas.genero, GROUP_CONCAT(DISTINCT albums.titulo ORDER BY albums.titulo SEPARATOR ', ') AS albums, GROUP_CONCAT(COALESCE(canciones.titulo, '') ORDER BY canciones.titulo SEPARATOR ', ') AS canciones FROM artistas INNER JOIN albums ON artistas.id = albums.id_artista LEFT JOIN canciones ON albums.id = canciones.id_album GROUP BY artistas.id, artistas.nombre, artistas.genero;"
        cursor.execute(query)
        todo = cursor.fetchall() 

        cursor.close()
        return todo

    except mysql.connector.Error as error:
        print(f"Error al obtener los artistas con sus datos -> {error}")

    finally:
        desconectar(conexion)
#--------------------------------------------------------------------------------------------------------------------------
def tendencias_completas():
    try:
        conexion = conectar()
        cursor = conexion.cursor()

        query = "SELECT tendencias.id AS id_tendencia, GROUP_CONCAT(DISTINCT tendencias.titulo ORDER BY tendencias.titulo SEPARATOR ', ') AS tendencia, GROUP_CONCAT(DISTINCT artistas.nombre ORDER BY artistas.nombre SEPARATOR ', ') AS artistas, tendencias.descripcion, GROUP_CONCAT(DISTINCT canciones.titulo ORDER BY canciones.titulo SEPARATOR ', ') AS canciones FROM tendencias INNER JOIN artista_tendencia ON tendencias.id = artista_tendencia.id_tendencia LEFT JOIN artistas ON artistas.id = artista_tendencia.id_artista LEFT JOIN cancion_tendencia ON tendencias.id = cancion_tendencia.id_tendencia LEFT JOIN canciones ON cancion_tendencia.id_cancion = canciones.id GROUP BY tendencias.id, tendencias.descripcion;"
        cursor.execute(query)
        todo = cursor.fetchall() 

        cursor.close()
        return todo

    except mysql.connector.Error as error:
        print(f"Error al obtener las tendencias completas -> {error}")

    finally:
        desconectar(conexion)
#--------------------------------------------------------------------------------------------------------------------------
#Programa

#ver artistas
'''artistas = ver_artistas()   
if artistas:
    print("Lista de artistas:")
    for artista in artistas:
        print(artista)'''
        
#ver albums
'''albums = ver_albums()
if albums:
    print("Lista de albums:")
    for album in albums:
        print(album)'''
        
#ver canciones
'''canciones = ver_canciones()
if canciones:
    print("Lista de canciones:")
    for cancion in canciones:
        print(cancion)'''
        
#ver tendencias
'''tendencias = ver_tendencias()
if tendencias:
    print("Lista de tendencias:")
    for tendencia in tendencias:
        print(tendencia)'''
        
#ver los artistas con sus albums y canciones
'''todos = mostrar_todo()
if todos:
    print("Artistas con sus respectivos albums y canciones:")
    for todo in todos:
        print(todo)'''
        
#ver las tendencias con sus artistas, canciones y descripción
'''tendCompleta = tendencias_completas()
if tendCompleta:
    print("Tendencias con sus respectivos artistas, descripciones y canciones:")
    for tend in tendCompleta:
        print(tend)'''

#agregar_artista(nombre, genero, pais, fecha_formacion)

#agregar_album(titulo, id_artista, fecha_lanzamiento)

#agregar_cancion(titulo, duracion, id_album)

#agregar_tendencia(titulo, descripcion)


#actualizar_artista(id_artista, nombre, genero, pais, fecha_formacion)

#actualizar_album(id_album, titulo, id_artista, fecha_lanzamiento)

#actualizar_cancion(id_cancion, titulo, duracion, id_album)

#actualizar_tendencia(id_tendencia, titulo, descripcion)


#eliminar_artista(id_artista)

#eliminar_album(id_album)

#eliminar_cancion(id_cancion)

#eliminar_tendencia(id_tendencia)
