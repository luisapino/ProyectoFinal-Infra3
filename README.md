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

**Nota de Seguridad**: Mantener registro de todos los cambios realizados y seguir las mejores prácticas de seguridad de AWS en todo momento.
