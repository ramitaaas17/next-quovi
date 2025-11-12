package models

import (
	"time"
)

type Usuario struct {
	IDUsuario     uint   `gorm:"column:idUsuario;primaryKey;autoIncrement" json:"idUsuario"`
	NombreUsuario string `gorm:"column:nombreUsuario;size:50;unique" json:"nombreUsuario,omitempty"`
	Email         string `gorm:"column:email;size:100;not null;unique" json:"email"`
	Password      string `gorm:"column:password;size:255" json:"-"`
	Nombre        string `gorm:"column:nombre;size:100" json:"nombre,omitempty"`
	Apellido      string `gorm:"column:apellido;size:100" json:"apellido,omitempty"`
	Foto          string `gorm:"column:foto;size:500" json:"foto,omitempty"`

	// Campos OAuth
	GoogleID        string `gorm:"column:googleId;size:255;unique" json:"googleId,omitempty"`
	Provider        string `gorm:"column:provider;size:20;default:'local'" json:"provider"`
	EmailVerificado bool   `gorm:"column:emailVerificado;default:false" json:"emailVerificado"`

	// Metadatos
	FechaRegistro time.Time  `gorm:"column:fechaRegistro;not null;default:CURRENT_TIMESTAMP" json:"fechaRegistro"`
	UltimoAcceso  *time.Time `gorm:"column:ultimoAcceso" json:"ultimoAcceso,omitempty"`
	Activo        bool       `gorm:"column:activo;default:true" json:"activo"`

	// Relaciones (omitir en migraciones automáticas)
	Reseñas   []Reseña   `gorm:"foreignKey:IDUsuario;constraint:OnDelete:CASCADE" json:"reseñas,omitempty"`
	Favoritos []Favorito `gorm:"foreignKey:IDUsuario;constraint:OnDelete:CASCADE" json:"favoritos,omitempty"`
	Busquedas []Busqueda `gorm:"foreignKey:IDUsuario;constraint:OnDelete:SET NULL" json:"busquedas,omitempty"`
}

// TableName especifica el nombre de la tabla en la BD
func (Usuario) TableName() string {
	return "usuarios"
}
