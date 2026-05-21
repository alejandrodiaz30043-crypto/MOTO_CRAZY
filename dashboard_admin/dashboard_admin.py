import os
from pathlib import Path

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns


BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
GRAFICOS_DIR = BASE_DIR / "graficos"
CSS_DIR = BASE_DIR / "assets" / "css"
JS_DIR = BASE_DIR / "assets" / "js"

PRODUCTOS_CSV = DATA_DIR / "productos.csv"
VENTAS_CSV = DATA_DIR / "ventas.csv"
DATOS_COMPLETOS_CSV = BASE_DIR / "datos_completos.csv"
GRAFICO_VENTAS = BASE_DIR / "grafico_ventas.png"
GRAFICO_CATEGORIAS = GRAFICOS_DIR / "ingresos_por_categoria.png"
ADMIN_DASHBOARD = BASE_DIR / "admin_dashboard.html"
CSS_DASHBOARD = CSS_DIR / "dashboard.css"
JS_DASHBOARD = JS_DIR / "dashboard.js"


def crear_csv_simulados():
    DATA_DIR.mkdir(exist_ok=True)
    GRAFICOS_DIR.mkdir(exist_ok=True)

    productos = pd.DataFrame(
        [
            [101, "Yamaha MT-03", "Motos Naked", 24500000],
            [102, "Kawasaki Ninja 400", "Motos Deportivas", 33900000],
            [103, "Honda CB 190R", "Motos Naked", 11800000],
            [104, "Suzuki V-Strom 250", "Motos Touring", 26900000],
            [105, "AKT NKD 125", "Motos Urbanas", 5790000],
            [106, "BMW G 310 GS", "Motos Touring", 32200000],
            [201, "Casco Integral Pro", "Cascos", 780000],
            [202, "Guantes Racing", "Proteccion", 230000],
            [203, "Chaqueta Impermeable", "Proteccion", 620000],
            [204, "Maletero 45L", "Equipaje", 520000],
            [205, "Intercomunicador Bluetooth", "Tecnologia", 390000],
            [206, "Botas Urban Rider", "Proteccion", 480000],
        ],
        columns=["producto_id", "nombre", "categoria", "precio"],
    )

    ventas = pd.DataFrame(
        [
            [1, "2026-01-03", 101, 1],
            [2, "2026-01-05", 201, 2],
            [3, "2026-01-08", 202, 3],
            [4, "2026-01-12", 105, 1],
            [5, "2026-01-15", 203, 2],
            [6, "2026-01-21", 204, 1],
            [7, "2026-01-25", 201, 1],
            [8, "2026-02-02", 102, 1],
            [9, "2026-02-04", 206, 2],
            [10, "2026-02-07", 202, 1],
            [11, "2026-02-10", 103, 1],
            [12, "2026-02-14", 205, 2],
            [13, "2026-02-18", 201, 2],
            [14, "2026-02-22", 204, 1],
            [15, "2026-02-27", 203, 1],
            [16, "2026-03-01", 104, 1],
            [17, "2026-03-04", 201, 3],
            [18, "2026-03-06", 202, 2],
            [19, "2026-03-09", 106, 1],
            [20, "2026-03-13", 203, 2],
            [21, "2026-03-16", 205, 1],
            [22, "2026-03-20", 201, 1],
            [23, "2026-03-23", 206, 1],
            [24, "2026-03-26", 105, 2],
            [25, "2026-04-02", 103, 1],
            [26, "2026-04-04", 201, 2],
            [27, "2026-04-07", 204, 2],
            [28, "2026-04-10", 202, 2],
            [29, "2026-04-12", 203, 1],
            [30, "2026-04-14", 102, 1],
            [31, "2026-04-18", 205, 3],
            [32, "2026-04-21", 206, 1],
            [33, "2026-04-25", 201, 2],
            [34, "2026-04-28", 104, 1],
            [35, "2026-05-02", 101, 1],
            [36, "2026-05-04", 202, 4],
            [37, "2026-05-06", 203, 2],
            [38, "2026-05-08", 105, 1],
            [39, "2026-05-10", 201, 2],
            [40, "2026-05-12", 204, 1],
            [41, "2026-05-14", 206, 2],
            [42, "2026-05-16", 205, 2],
            [43, "2026-05-18", 102, 1],
            [44, "2026-05-20", 103, 1],
            [45, "2026-06-02", 201, 3],
            [46, "2026-06-04", 202, 2],
            [47, "2026-06-06", 203, 1],
            [48, "2026-06-08", 204, 2],
            [49, "2026-06-10", 205, 2],
            [50, "2026-06-12", 106, 1],
            [51, "2026-06-14", 101, 1],
            [52, "2026-06-16", 206, 1],
            [53, "2026-06-18", 105, 2],
            [54, "2026-06-20", 201, 2],
            [55, "2026-07-02", 102, 1],
            [56, "2026-07-04", 203, 2],
            [57, "2026-07-06", 202, 3],
            [58, "2026-07-08", 204, 1],
            [59, "2026-07-10", 205, 1],
            [60, "2026-07-12", 201, 2],
        ],
        columns=["venta_id", "fecha", "producto_id", "cantidad"],
    )

    productos.to_csv(PRODUCTOS_CSV, index=False, encoding="utf-8")
    ventas.to_csv(VENTAS_CSV, index=False, encoding="utf-8")

    datos_completos = ventas.merge(productos, on="producto_id", how="inner")
    datos_completos["Total_Ingreso"] = datos_completos["cantidad"] * datos_completos["precio"]
    datos_completos["mes"] = pd.to_datetime(datos_completos["fecha"]).dt.to_period("M").astype(str)
    datos_completos.to_csv(DATOS_COMPLETOS_CSV, index=False, encoding="utf-8")


def moneda_colombiana(valor):
    return f"${valor:,.0f}".replace(",", ".")


def crear_archivos_estaticos():
    CSS_DIR.mkdir(parents=True, exist_ok=True)
    JS_DIR.mkdir(parents=True, exist_ok=True)

    css_dashboard = """* {
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 20px;
    background-color: #f4f4f9;
    color: #333;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.contenedor {
    max-width: 900px;
    margin: auto;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.encabezado-dashboard {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 16px;
}

h1,
h2 {
    color: #333333;
}

.metricas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
    margin: 20px 0;
}

.metrica {
    padding: 16px;
    color: #ffffff;
    background-color: #111111;
    border-radius: 8px;
}

.metrica strong {
    display: block;
    color: #ff2b2b;
    font-size: 24px;
}

.boton-imprimir {
    min-height: 40px;
    padding: 10px 14px;
    color: #ffffff;
    background: #007bff;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 700;
}

.boton-imprimir:hover {
    background: #005fcc;
}

img {
    max-width: 100%;
    margin-top: 20px;
    border: 2px solid #cccccc;
    border-radius: 8px;
}

table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
}

th,
td {
    padding: 12px;
    border: 1px solid #dddddd;
    text-align: left;
}

th {
    color: #ffffff;
    background-color: #007bff;
}

.nota-reporte {
    color: #666666;
}

@media print {
    body {
        background: #ffffff;
    }

    .contenedor {
        box-shadow: none;
    }

    .boton-imprimir {
        display: none;
    }
}
"""

    js_dashboard = """document.addEventListener("DOMContentLoaded", function () {
    const botonImprimir = document.querySelector("[data-accion='imprimir-dashboard']");
    const fechaReporte = document.querySelector("[data-fecha-reporte]");

    if (fechaReporte) {
        fechaReporte.textContent = new Date().toLocaleDateString("es-CO", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    if (botonImprimir) {
        botonImprimir.addEventListener("click", function () {
            window.print();
        });
    }
});
"""

    CSS_DASHBOARD.write_text(css_dashboard, encoding="utf-8")
    JS_DASHBOARD.write_text(js_dashboard, encoding="utf-8")


crear_csv_simulados()
crear_archivos_estaticos()
os.chdir(BASE_DIR)

# 1. Cargar Datos
df = pd.read_csv("datos_completos.csv")
sns.set_theme(style="whitegrid")

df = df.dropna(subset=["nombre", "categoria", "precio", "cantidad", "Total_Ingreso"])
df["Total_Ingreso"] = pd.to_numeric(df["Total_Ingreso"], errors="coerce").fillna(0)
df["cantidad"] = pd.to_numeric(df["cantidad"], errors="coerce").fillna(0).astype(int)

# 2. Generar y guardar grafico
ventas_por_mes = df.groupby("mes", as_index=False)["Total_Ingreso"].sum()

plt.figure(figsize=(8, 5))
sns.barplot(data=ventas_por_mes, x="mes", y="Total_Ingreso", errorbar=None, palette="viridis", hue="mes", legend=False)
plt.title("Ventas por Mes")
plt.xlabel("Mes")
plt.ylabel("Total Ingreso")
plt.xticks(rotation=25)
plt.savefig("grafico_ventas.png", bbox_inches="tight")
plt.close()

ingresos_categoria = df.groupby("categoria", as_index=False)["Total_Ingreso"].sum()

plt.figure(figsize=(8, 5))
sns.barplot(data=ingresos_categoria, x="Total_Ingreso", y="categoria", errorbar=None, palette="rocket", hue="categoria", legend=False)
plt.title("Ingresos por Categoria")
plt.xlabel("Total Ingreso")
plt.ylabel("Categoria")
plt.savefig(GRAFICO_CATEGORIAS, bbox_inches="tight")
plt.close()

# 3. Preparar la Tabla
resumen_productos = df.groupby("nombre")["Total_Ingreso"].sum().reset_index()
resumen_productos = resumen_productos.sort_values(by="Total_Ingreso", ascending=False).head(3)
resumen_productos["Total_Ingreso"] = resumen_productos["Total_Ingreso"].apply(moneda_colombiana)

# Convertir tabla a HTML y darle formato de moneda
tabla_productos_html = resumen_productos.to_html(index=False, border=1)

# 4. Ensamblar la Pagina Web
total_ingresos = moneda_colombiana(df["Total_Ingreso"].sum())
total_unidades = int(df["cantidad"].sum())
total_transacciones = len(df)

html_final = f"""
<!DOCTYPE html>
<html lang="es">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Panel Administrativo de MotoCrazy MC</title>
 <link rel="stylesheet" href="assets/css/dashboard.css">
</head>
<body>
 <div class="contenedor">
 <header class="encabezado-dashboard">
  <div>
   <h1>Panel Administrativo de MotoCrazy MC</h1>
   <p class="nota-reporte">Fecha del reporte: <span data-fecha-reporte></span></p>
  </div>
  <button class="boton-imprimir" type="button" data-accion="imprimir-dashboard">Imprimir</button>
 </header>
 <hr>

 <div class="metricas">
  <div class="metrica"><strong>{total_ingresos}</strong>Ingresos totales</div>
  <div class="metrica"><strong>{total_unidades}</strong>Unidades vendidas</div>
  <div class="metrica"><strong>{total_transacciones}</strong>Transacciones analizadas</div>
 </div>

 <h2>1. Analisis Visual de Tendencias</h2>
 <p>El siguiente grafico muestra el comportamiento de los ingresos a lo largo de los meses analizados:</p>
 <img src="grafico_ventas.png" alt="Grafico de Ventas" width="700">

 <h2>2. Ingresos por Categoria</h2>
 <p>Este grafico permite identificar que categorias generan mas ingresos para la tienda:</p>
 <img src="graficos/ingresos_por_categoria.png" alt="Grafico de Ingresos por Categoria" width="700">

 <h2>3. Top 3 Productos Estrella</h2>
 <p>Estos son los productos que mas ingresos han generado para la compania:</p>
 {tabla_productos_html}

 <br><br>
 <p class="nota-reporte"><i>Reporte generado automaticamente por Python, Pandas, Matplotlib y Seaborn.</i></p>
 </div>
 <script src="assets/js/dashboard.js"></script>
</body>
</html>
"""

# 5. Escribir el archivo
with open("admin_dashboard.html", "w", encoding="utf-8") as file:
    file.write(html_final)

print("Dashboard generado correctamente: admin_dashboard.html")
