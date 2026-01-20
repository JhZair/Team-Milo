from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nombre_negocio = db.Column(db.String(100), nullable=False) # [cite: 135]
    sector = db.Column(db.String(50)) # Ejemplo: Gastronomía o Retail [cite: 58]
    suscripcion_activa = db.Column(db.Boolean, default=False) # [cite: 82]
    # Relación uno a uno con la billetera
    wallet = db.relationship('AdWallet', backref='dueno', uselist=False)

class AdWallet(db.Model):
    __tablename__ = 'ad_wallet'
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    saldo = db.Column(db.Numeric(10, 2), default=0.00) # Saldo para Meta Ads [cite: 83, 84]
    fecha_ultima_recarga = db.Column(db.DateTime)

class GuionIA(db.Model):
    __tablename__ = 'guiones_ia'
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    tendencia_local = db.Column(db.String(255)) # [cite: 62]
    contenido_guion = db.Column(db.Text) # [cite: 63]
    fecha_creacion = db.Column(db.DateTime, server_default=db.func.now())