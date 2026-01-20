import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from models import db, Usuario, AdWallet

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuración de base de datos local
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Crear las tablas automáticamente si no existen
with app.app_context():
    db.create_all()

@app.route('/api/usuario/crear', methods=['POST'])
def crear_usuario():
    data = request.json
    nuevo_usuario = Usuario(nombre_negocio=data['nombre'], sector=data['sector'])
    db.session.add(nuevo_usuario)
    db.session.commit()
    
    # Inicializar billetera con saldo 0
    nueva_wallet = AdWallet(usuario_id=nuevo_usuario.id, saldo=0.0)
    db.session.add(nueva_wallet)
    db.session.commit()
    
    return jsonify({"message": "Usuario y Wallet creados", "id": nuevo_usuario.id}), 201

if __name__ == "__main__":
    # Usa 0.0.0.0 para ser visible en WSL
    # debug=True para ver errores de la base de datos en tiempo real
    app.run(host='0.0.0.0', port=5000, debug=True)