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

# Ejecuta la prueba de carga por 5 minutos usando 2 cores
run_load_test 3000 2