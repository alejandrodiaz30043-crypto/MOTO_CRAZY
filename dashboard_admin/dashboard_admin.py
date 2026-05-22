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

    css_dashboard = """@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');

*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

:root {
    --rojo-moto:    #e62b2b;
    --rojo-oscuro:  #b51f1f;
    --negro:        #0d0d0d;
    --gris-oscuro:  #1a1a2e;
    --gris-panel:   #16213e;
    --gris-medio:   #2a2a4a;
    --blanco:       #ffffff;
    --texto-claro:  #e0e0f0;
    --texto-suave:  #9090b0;
    --fondo:        #0a0a1a;
    --acento:       #ff4d4d;
    --sombra-roja:  rgba(230, 43, 43, 0.35);
    --sombra-panel: rgba(0, 0, 0, 0.5);
    --radio:        12px;
    --radio-sm:     8px;
    --transicion:   0.3s ease;
}

body {
    margin: 0;
    padding: 32px 20px;
    background: var(--fondo);
    background-image:
        radial-gradient(ellipse at 10% 10%, rgba(230,43,43,0.08) 0%, transparent 55%),
        radial-gradient(ellipse at 90% 90%, rgba(26,26,46,0.9) 0%, transparent 60%);
    color: var(--texto-claro);
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 15px;
    line-height: 1.6;
    min-height: 100vh;
}

/* ── Contenedor principal ───────────────────────────────── */
.contenedor {
    max-width: 980px;
    margin: 0 auto;
    padding: 40px 44px;
    background: var(--gris-oscuro);
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.06);
    box-shadow:
        0 4px 6px rgba(0,0,0,0.3),
        0 20px 60px rgba(0,0,0,0.6),
        inset 0 1px 0 rgba(255,255,255,0.05);
}

/* ── Encabezado ─────────────────────────────────────────── */
.encabezado-dashboard {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    padding-bottom: 28px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    margin-bottom: 32px;
}

.encabezado-dashboard h1 {
    font-size: 1.75rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    background: linear-gradient(135deg, var(--blanco) 0%, var(--acento) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

h2 {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--blanco);
    letter-spacing: 0.3px;
    margin: 36px 0 10px;
    padding-left: 14px;
    border-left: 4px solid var(--rojo-moto);
}

p {
    color: var(--texto-suave);
    margin-bottom: 8px;
}

hr {
    display: none;
}

/* ── Nota / fecha ───────────────────────────────────────── */
.nota-reporte {
    font-size: 0.82rem;
    color: var(--texto-suave);
    margin-top: 6px;
    font-style: italic;
}

/* ── Tarjetas de métricas ───────────────────────────────── */
.metricas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin: 28px 0 36px;
}

.metrica {
    position: relative;
    overflow: hidden;
    padding: 22px 20px;
    background: var(--gris-panel);
    border-radius: var(--radio);
    border: 1px solid rgba(255,255,255,0.06);
    box-shadow: 0 8px 24px var(--sombra-panel);
    transition: transform var(--transicion), box-shadow var(--transicion);
}

.metrica::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 3px;
    background: linear-gradient(90deg, var(--rojo-moto), var(--acento));
    border-radius: var(--radio) var(--radio) 0 0;
}

.metrica::after {
    content: '';
    position: absolute;
    bottom: -20px; right: -20px;
    width: 90px; height: 90px;
    background: var(--rojo-moto);
    opacity: 0.05;
    border-radius: 50%;
    transition: opacity var(--transicion);
}

.metrica:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px var(--sombra-panel), 0 0 20px var(--sombra-roja);
}

.metrica:hover::after {
    opacity: 0.12;
}

.metrica strong {
    display: block;
    font-size: 1.7rem;
    font-weight: 800;
    color: var(--acento);
    letter-spacing: -0.5px;
    margin-bottom: 4px;
    line-height: 1.1;
}

/* ── Botón imprimir ─────────────────────────────────────── */
.boton-imprimir {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    padding: 10px 22px;
    color: var(--blanco);
    background: linear-gradient(135deg, var(--rojo-moto), var(--rojo-oscuro));
    border: none;
    border-radius: var(--radio-sm);
    cursor: pointer;
    font-weight: 700;
    font-size: 0.88rem;
    letter-spacing: 0.4px;
    box-shadow: 0 4px 14px var(--sombra-roja);
    transition: all var(--transicion);
    white-space: nowrap;
}

.boton-imprimir:hover {
    background: linear-gradient(135deg, var(--acento), var(--rojo-moto));
    box-shadow: 0 6px 20px var(--sombra-roja);
    transform: translateY(-2px);
}

.boton-imprimir:active {
    transform: translateY(0);
}

/* ── Imágenes / gráficos ────────────────────────────────── */
img {
    max-width: 100%;
    margin-top: 16px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: var(--radio);
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    display: block;
}

/* ── Tabla ──────────────────────────────────────────────── */
table {
    width: 100%;
    margin-top: 16px;
    border-collapse: collapse;
    border-radius: var(--radio);
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.35);
}

th {
    padding: 14px 16px;
    background: linear-gradient(135deg, var(--rojo-moto), var(--rojo-oscuro));
    color: var(--blanco);
    text-align: left;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    border: none;
}

td {
    padding: 13px 16px;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    color: var(--texto-claro);
    font-size: 0.92rem;
    background: var(--gris-panel);
    transition: background var(--transicion);
}

tr:last-child td {
    border-bottom: none;
}

tr:hover td {
    background: var(--gris-medio);
}

tr:nth-child(even) td {
    background: rgba(255,255,255,0.02);
}

tr:nth-child(even):hover td {
    background: var(--gris-medio);
}

/* ── Pie de página ──────────────────────────────────────── */
.nota-reporte i {
    display: block;
    margin-top: 32px;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.06);
    font-size: 0.78rem;
    color: var(--texto-suave);
    text-align: center;
    letter-spacing: 0.2px;
}

/* ── Print ──────────────────────────────────────────────── */
@media print {
    body {
        background: #ffffff;
        color: #111;
        padding: 0;
    }

    .contenedor {
        box-shadow: none;
        border: none;
        background: #fff;
        padding: 20px;
    }

    .encabezado-dashboard h1 {
        -webkit-text-fill-color: #111;
        color: #111;
    }

    h2 {
        color: #111;
    }

    .metricas {
        grid-template-columns: repeat(3, 1fr);
    }

    .metrica {
        background: #f5f5f5;
        border: 1px solid #ddd;
        box-shadow: none;
    }

    .metrica::before { display: none; }

    .metrica strong {
        color: #cc0000;
    }

    td {
        background: #fff !important;
        color: #111;
        border-bottom: 1px solid #eee;
    }

    th {
        background: #cc0000 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }

    .boton-imprimir {
        display: none;
    }

    img {
        box-shadow: none;
        border: 1px solid #ccc;
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