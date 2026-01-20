from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nombre_negocio = db.Column(db.String(100), nullable=False)
    # Atributo clave para el modelo SaaS [cite: 82]
    suscripcion_activa = db.Column(db.Boolean, default=False)
    wallet = db.relationship('AdWallet', backref='propietario', uselist=False)

class AdWallet(db.Model):
    __tablename__ = 'ad_wallet'
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    # Saldo para recargas vía Yape o Plin [cite: 83]
    saldo = db.Column(db.Numeric(10, 2), default=0.00)