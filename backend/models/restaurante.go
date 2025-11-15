package models

import (
	"time"
)

// Restaurante representa un restaurante en el sistema
type Restaurante struct {
	IDRestaurante        uint      `gorm:"column:idRestaurante;primaryKey;autoIncrement" json:"idRestaurante"`
	Nombre               string    `gorm:"column:nombre;size:100;not null" json:"nombre"`
	Direccion            string    `gorm:"column:direccion;size:200;not null" json:"direccion"`
	IDCiudad             uint      `gorm:"column:idCiudad;not null" json:"idCiudad"`
	Latitud              float64   `gorm:"column:latitud;type:decimal(10,8);not null" json:"latitud"`
	Longitud             float64   `gorm:"column:longitud;type:decimal(11,8);not null" json:"longitud"`
	Telefono             string    `gorm:"column:telefono;size:20" json:"telefono,omitempty"`
	Sitioweb             string    `gorm:"column:sitioweb;size:200" json:"sitioweb,omitempty"`
	Descripcion          string    `gorm:"column:descripcion;type:text" json:"descripcion,omitempty"`
	PrecioPromedio       float64   `gorm:"column:precioPromedio;type:decimal(8,2)" json:"precioPromedio,omitempty"`
	CalificacionPromedio float64   `gorm:"column:calificacionPromedio;type:decimal(3,2);default:0" json:"calificacionPromedio"`
	TotalReseñas         int       `gorm:"column:totalReseñas;default:0" json:"totalReseñas"`
	Activo               bool      `gorm:"column:activo;default:true" json:"activo"`
	FechaRegistro        time.Time `gorm:"column:fechaRegistro;not null;default:CURRENT_TIMESTAMP" json:"fechaRegistro"`

	// Relaciones - CON LOS NOMBRES CORRECTOS DE COLUMNAS
	Ciudad          Ciudad                      `gorm:"foreignKey:IDCiudad" json:"ciudad,omitempty"`
	Categorias      []CategoriaRestaurante      `gorm:"many2many:restaurante_categorias;foreignKey:IDRestaurante;joinForeignKey:idRestaurante;References:IDCategoria;joinReferences:idCategoria" json:"categorias,omitempty"`
	Caracteristicas []CaracteristicaRestaurante `gorm:"many2many:restaurante_caracteristicas;foreignKey:IDRestaurante;joinForeignKey:idRestaurante;References:IDCaracteristica;joinReferences:idCaracteristica" json:"caracteristicas,omitempty"`
	Platillos       []Platillo                  `gorm:"foreignKey:IDRestaurante" json:"platillos,omitempty"`
	Horarios        []Horario                   `gorm:"foreignKey:IDRestaurante" json:"horarios,omitempty"`
	Imagenes        []ImagenRestaurante         `gorm:"foreignKey:IDRestaurante" json:"imagenes,omitempty"`
}

func (Restaurante) TableName() string {
	return "restaurantes"
}

// Ciudad representa una ciudad
type Ciudad struct {
	IDCiudad     uint    `gorm:"column:idCiudad;primaryKey;autoIncrement" json:"idCiudad"`
	NombreCiudad string  `gorm:"column:nombreCiudad;size:50;not null" json:"nombreCiudad"`
	Estado       string  `gorm:"column:estado;size:50;not null" json:"estado"`
	Pais         string  `gorm:"column:pais;size:50;default:'México'" json:"pais"`
	Latitud      float64 `gorm:"column:latitud;type:decimal(10,8)" json:"latitud,omitempty"`
	Longitud     float64 `gorm:"column:longitud;type:decimal(11,8)" json:"longitud,omitempty"`
}

func (Ciudad) TableName() string {
	return "ciudades"
}

// CategoriaRestaurante representa una categoría de cocina
type CategoriaRestaurante struct {
	IDCategoria     uint   `gorm:"column:idCategoria;primaryKey;autoIncrement" json:"idCategoria"`
	NombreCategoria string `gorm:"column:nombreCategoria;size:50;not null;unique" json:"nombreCategoria"`
	Descripcion     string `gorm:"column:descripcion;size:200" json:"descripcion,omitempty"`
	Icono           string `gorm:"column:icono;size:100" json:"icono,omitempty"`
}

func (CategoriaRestaurante) TableName() string {
	return "categorias_cocina"
}

// CaracteristicaRestaurante representa características del restaurante
type CaracteristicaRestaurante struct {
	IDCaracteristica     uint   `gorm:"column:idCaracteristica;primaryKey;autoIncrement" json:"idCaracteristica"`
	NombreCaracteristica string `gorm:"column:nombreCaracteristica;size:50;not null;unique" json:"nombreCaracteristica"`
	Descripcion          string `gorm:"column:descripcion;size:200" json:"descripcion,omitempty"`
	Icono                string `gorm:"column:icono;size:100" json:"icono,omitempty"`
}

func (CaracteristicaRestaurante) TableName() string {
	return "caracteristicas"
}

// Platillo representa un platillo del menú
type Platillo struct {
	IDPlatillo    uint    `gorm:"column:idPlatillo;primaryKey;autoIncrement" json:"idPlatillo"`
	IDRestaurante uint    `gorm:"column:idRestaurante;not null" json:"idRestaurante"`
	Nombre        string  `gorm:"column:nombre;size:100;not null" json:"nombre"`
	Precio        float64 `gorm:"column:precio;type:decimal(8,2);not null" json:"precio"`
	Descripcion   string  `gorm:"column:descripcion;type:text" json:"descripcion,omitempty"`
	Ingredientes  string  `gorm:"column:ingredientes;type:text" json:"ingredientes,omitempty"`
	Imagen        string  `gorm:"column:imagen;size:500" json:"imagen,omitempty"`
	Disponible    bool    `gorm:"column:disponible;default:true" json:"disponible"`
	Destacado     bool    `gorm:"column:destacado;default:false" json:"destacado"`
}

func (Platillo) TableName() string {
	return "platillos"
}

// Horario representa los horarios de apertura
type Horario struct {
	IDRestaurante uint   `gorm:"column:idRestaurante;primaryKey;not null" json:"idRestaurante"`
	Dia           int8   `gorm:"column:dia;primaryKey;not null;check:dia >= 1 AND dia <= 7" json:"dia"`
	Apertura      string `gorm:"column:apertura;type:time;not null" json:"apertura"`
	Cierre        string `gorm:"column:cierre;type:time;not null" json:"cierre"`
	Cerrado       bool   `gorm:"column:cerrado;default:false" json:"cerrado"`
}

func (Horario) TableName() string {
	return "horarios"
}

// ImagenRestaurante representa las imágenes del restaurante
type ImagenRestaurante struct {
	IDImagen      uint      `gorm:"column:idImagen;primaryKey;autoIncrement" json:"idImagen"`
	IDRestaurante uint      `gorm:"column:idRestaurante;not null" json:"idRestaurante"`
	URL           string    `gorm:"column:url;size:500;not null" json:"url"`
	EsPrincipal   bool      `gorm:"column:esPrincipal;default:false" json:"esPrincipal"`
	Orden         int       `gorm:"column:orden;default:0" json:"orden"`
	FechaSubida   time.Time `gorm:"column:fechaSubida;not null;default:CURRENT_TIMESTAMP" json:"fechaSubida"`
}

func (ImagenRestaurante) TableName() string {
	return "imagenes_restaurante"
}
