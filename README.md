# Guía Despliegue App

**Universidad ICESI - Infraestructura III**  
**Autores:**  
- Santiago Barraza A00375190
- Luisa Castaño A00380290
- Juan Yustes A00380718
  
**Profesor a cargo:** 
- Mario Germán Castillo  

---

## Índice

1. Descripción General de la Infraestructura
2. Prerequisitos
3. Despliegue de la Infraestructura
4. Verificación del Despliegue
5. Gestión y Mantenimiento
6. Monitoreo
7. Resolución de Problemas
8. Limpieza de Recursos

---

## 1. Descripción General de la Infraestructura

La infraestructura desplegada consiste en:

1. **Red**: VPC con subredes públicas y privadas en dos zonas de disponibilidad.
2. **Computación**:
   - Frontend en Auto Scaling Group con instancias EC2 en subredes públicas.
   - Backend en Auto Scaling Group con instancias EC2 en subredes privadas.
3. **Base de Datos**: RDS PostgreSQL en subredes privadas.
4. **Balanceadores**:
   - ALB público para el frontend.
   - ALB interno para el backend.
5. **Seguridad**: Grupos de seguridad específicos para cada componente.

## 2. Prerrequisitos

1. **Cuenta AWS**:
   - Acceso a la consola de AWS.
   - Usuario con permisos adecuados para crear y gestionar recursos.
2. **Par de Claves EC2**:
   - Crear y guardar el archivo .pem del par de claves.
3. **Preparar el Template**:
   - Guardar el template YAML proporcionado en formato válido.

## 3. Despliegue de la Infraestructura

1. **Acceder a CloudFormation** y seleccionar la región deseada.
2. **Crear el Stack** con el template YAML.
3. **Configurar Parámetros** como `Nombre del stack`, `EnvironmentName`, y `KeyName`.
4. **Configurar Opciones del Stack** y verificar permisos IAM si es necesario.
5. **Revisar y Crear** el stack.

## 4. Verificación del Despliegue

1. **Monitorear Progreso** en la pestaña "Eventos" del stack hasta que el estado sea "CREATE_COMPLETE".
2. **Verificar Recursos**:
   - VPC y subredes.
   - Instancias EC2 en el Auto Scaling Group.
   - Base de Datos en RDS.
   - Load Balancers para frontend y backend.

## 5. Gestión y Mantenimiento

1. **Gestión de Auto Scaling**:
   - Modificar Grupos de Auto Scaling.
   - Terminar instancias para pruebas de auto-scaling.
2. **Gestión de RDS**:
   - Crear snapshots.
   - Modificar configuraciones de instancia.

## 6. Monitoreo

1. **CloudWatch**:
   - Monitorear métricas de EC2, RDS, y ALB.
2. **Configurar Dashboards** en CloudWatch para métricas importantes.
3. **Ver Logs** de las aplicaciones en CloudWatch.

## 7. Resolución de Problemas

1. **Fallo en Creación del Stack**: Revisar la pestaña "Eventos" del stack y corregir errores.
2. **Problemas de Conexión**:
   - Verificar grupos de seguridad.
   - Comprobar configuración de red.
3. **Problemas de Auto Scaling**:
   - Revisar logs de instancias y health checks.

## 8. Limpieza de Recursos

1. **Antes de Eliminar**: Hacer backup de datos importantes y crear snapshots finales de RDS.
2. **Eliminar Stack** en CloudFormation.
3. **Verificar Limpieza**: Asegurarse de que todos los recursos se eliminaron.

---
## Guía de Prueba de Estrés para EC2 probando el Auto Scaling

## Conexión SSH a la Instancia EC2

```bash
# Asegúrate de que tu archivo .pem tenga los permisos correctos
chmod 400 tu-key.pem

# Conéctate a la instancia
ssh -i "tu-key.pem" ec2-user@tu-ip-publica
```

## Creación del Script de Prueba

1. Crear el archivo de script:
```bash
nano stress_test.sh
```

2. Copiar el siguiente contenido:
```bash
#!/bin/bash
# Función para mostrar el uso de CPU actual
show_cpu_usage() {
    top -bn1 | grep "Cpu(s)" | \
    sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | \
    awk '{print 100 - $1"%"}'
}

# Función para realizar la prueba de carga
run_load_test() {
    duration=$1
    cpu_cores=$2
    
    echo "Iniciando prueba de carga..."
    echo "CPU antes de la prueba: $(show_cpu_usage)"
    
    # Ejecuta stress por la duración especificada usando el número de cores especificado
    stress --cpu $cpu_cores --timeout ${duration}s
    
    echo "Prueba completada"
    echo "CPU después de la prueba: $(show_cpu_usage)"
}

# Ejecuta la prueba de carga por 50 minutos usando 2 cores
run_load_test 3000 2
```

3. Guardar el archivo:
- Presiona `Ctrl + X`
- Presiona `Y` para confirmar
- Presiona `Enter` para guardar

## Preparación y Ejecución

1. Instalar stress (si no está instalado):
```bash
# Para Amazon Linux/RHEL
sudo yum install stress -y

# Para Ubuntu
sudo apt-get update
sudo apt-get install stress -y
```

2. Dar permisos de ejecución al script:
```bash
chmod +x stress_test.sh
```

3. Ejecutar el script:
```bash
./stress_test.sh
```

## Monitoreo con CloudWatch

1. Configurar alarmas en CloudWatch:
   - Ve a la consola de AWS
   - Navega a CloudWatch
   - Crea una nueva alarma:
     - Métrica: EC2 > Per-Instance Metrics > CPUUtilization
     - Condición: mayor que 80%
     - Período: 5 minutos
     - Acciones: Configurar notificación SNS (opcional)

2. Durante la prueba, puedes monitorear:
   - CPU Utilization
   - Status Check
   - Network In/Out
   - Disk I/O

3. Acceso a métricas en tiempo real:
   - Dashboard de CloudWatch
   - Pestaña de monitoreo en la consola EC2
   - Gráficos detallados de utilización

Y ya finalmente cuando las alarmas se inicien, podrás ver como llega la notificación a correo y se empiezan a crear un instancias por el auto scaling para soportar el tráfico.

**Nota de Seguridad**: Mantener registro de todos los cambios realizados y seguir las mejores prácticas de seguridad de AWS en todo momento.
