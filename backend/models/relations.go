package models

import (
	"time"
)

// Sesion representa una sesion activa de usuario con token JWT
type Sesion struct {
	IDSesion      uint      `gorm:"column:idSesion;primaryKey;autoIncrement" json:"idSesion"`
	IDUsuario     uint      `gorm:"column:idUsuario;not null" json:"idUsuario"`
	Token         string    `gorm:"column:token;size:500;not null;unique" json:"token"`
	RefreshToken  string    `gorm:"column:refreshToken;size:500" json:"refreshToken,omitempty"`
	Provider      string    `gorm:"column:provider;size:20" json:"provider,omitempty"`
	ExpiraEn      time.Time `gorm:"column:expiraEn;not null" json:"expiraEn"`
	IPAddress     string    `gorm:"column:ipAddress;size:45" json:"ipAddress,omitempty"`
	UserAgent     string    `gorm:"column:userAgent;size:500" json:"userAgent,omitempty"`
	FechaCreacion time.Time `gorm:"column:fechaCreacion;not null;default:CURRENT_TIMESTAMP" json:"fechaCreacion"`

	Usuario Usuario `gorm:"foreignKey:IDUsuario;constraint:OnDelete:CASCADE" json:"usuario,omitempty"`
}

func (Sesion) TableName() string {
	return "sesiones"
}

// Busqueda almacena el historial de busquedas realizadas
type Busqueda struct {
	IDBusqueda            uint      `gorm:"column:idBusqueda;primaryKey;autoIncrement" json:"idBusqueda"`
	IDUsuario             *uint     `gorm:"column:idUsuario" json:"idUsuario,omitempty"`
	Texto                 string    `gorm:"column:texto;type:text;not null" json:"texto"`
	Contexto              string    `gorm:"column:contexto;size:100" json:"contexto,omitempty"`
	ResultadosEncontrados int       `gorm:"column:resultadosEncontrados" json:"resultadosEncontrados"`
	Fecha                 time.Time `gorm:"column:fecha;not null;default:CURRENT_TIMESTAMP" json:"fecha"`

	Usuario *Usuario `gorm:"foreignKey:IDUsuario;constraint:OnDelete:SET NULL" json:"usuario,omitempty"`
}

func (Busqueda) TableName() string {
	return "busquedas"
}

// Reseña representa una calificacion y comentario sobre un restaurante
type Reseña struct {
	IDReseña      uint      `gorm:"column:idReseña;primaryKey;autoIncrement" json:"idReseña"`
	IDUsuario     uint      `gorm:"column:idUsuario;not null" json:"idUsuario"`
	IDRestaurante uint      `gorm:"column:idRestaurante;not null" json:"idRestaurante"`
	Calificacion  int8      `gorm:"column:calificacion;not null;check:calificacion >= 1 AND calificacion <= 5" json:"calificacion"`
	Comentario    string    `gorm:"column:comentario;type:text" json:"comentario,omitempty"`
	Fecha         time.Time `gorm:"column:fecha;not null;default:CURRENT_TIMESTAMP" json:"fecha"`
	Verificada    bool      `gorm:"column:verificada;default:false" json:"verificada"`

	Usuario     Usuario     `gorm:"foreignKey:IDUsuario;constraint:OnDelete:CASCADE" json:"usuario,omitempty"`
	Restaurante Restaurante `gorm:"foreignKey:IDRestaurante;constraint:OnDelete:CASCADE" json:"restaurante,omitempty"`
}

func (Reseña) TableName() string {
	return "resenas"
}

// Favorito representa la relacion entre usuarios y sus restaurantes favoritos
type Favorito struct {
	IDUsuario     uint      `gorm:"column:idUsuario;primaryKey;not null" json:"idUsuario"`
	IDRestaurante uint      `gorm:"column:idRestaurante;primaryKey;not null" json:"idRestaurante"`
	Fecha         time.Time `gorm:"column:fecha;not null;default:CURRENT_TIMESTAMP" json:"fecha"`

	Usuario     Usuario     `gorm:"foreignKey:IDUsuario;constraint:OnDelete:CASCADE" json:"usuario,omitempty"`
	Restaurante Restaurante `gorm:"foreignKey:IDRestaurante;constraint:OnDelete:CASCADE" json:"restaurante,omitempty"`
}

func (Favorito) TableName() string {
	return "favoritos"
}
