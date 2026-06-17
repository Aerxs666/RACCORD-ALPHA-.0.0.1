#!/usr/bin/env python3
"""
Script de Diagnóstico - Verifica que todo está listo para ejecutar RACCORD
Uso: python diagnose.py
"""

import os
import sys
import subprocess
from pathlib import Path

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'

def check_file(path):
    """Verifica si un archivo existe"""
    return Path(path).exists()

def check_command(cmd):
    """Verifica si un comando está disponible"""
    try:
        subprocess.run([cmd, '--version'], capture_output=True, timeout=5)
        return True
    except:
        return False

def main():
    print(f"\n{Colors.BLUE}{'='*70}")
    print(f"RACCORD - DIAGNÓSTICO DEL SISTEMA")
    print(f"{'='*70}{Colors.END}\n")
    
    issues = []
    
    # 1. Verificar Python
    print(f"{Colors.BLUE}[1/8]{Colors.END} Verificando Python...")
    if check_command('python'):
        try:
            result = subprocess.run(['python', '--version'], capture_output=True, text=True)
            print(f"  {Colors.GREEN}✓{Colors.END} {result.stdout.strip()}")
        except:
            print(f"  {Colors.RED}✗{Colors.END} Error verificando Python")
            issues.append("Python no responde correctamente")
    else:
        print(f"  {Colors.RED}✗{Colors.END} Python no está instalado")
        issues.append("Python 3.8+ es requerido")
    
    # 2. Verificar Node.js
    print(f"{Colors.BLUE}[2/8]{Colors.END} Verificando Node.js...")
    if check_command('node'):
        try:
            result = subprocess.run(['node', '--version'], capture_output=True, text=True)
            print(f"  {Colors.GREEN}✓{Colors.END} {result.stdout.strip()}")
        except:
            print(f"  {Colors.RED}✗{Colors.END} Error verificando Node.js")
            issues.append("Node.js no responde correctamente")
    else:
        print(f"  {Colors.RED}✗{Colors.END} Node.js no está instalado")
        issues.append("Node.js v16+ es requerido")
    
    # 3. Verificar npm
    print(f"{Colors.BLUE}[3/8]{Colors.END} Verificando npm...")
    if check_command('npm'):
        try:
            result = subprocess.run(['npm', '--version'], capture_output=True, text=True)
            print(f"  {Colors.GREEN}✓{Colors.END} npm {result.stdout.strip()}")
        except:
            print(f"  {Colors.RED}✗{Colors.END} Error verificando npm")
            issues.append("npm no responde correctamente")
    else:
        print(f"  {Colors.RED}✗{Colors.END} npm no está disponible")
        issues.append("npm es requerido")
    
    # 4. Verificar archivos principales
    print(f"{Colors.BLUE}[4/8]{Colors.END} Verificando estructura de archivos...")
    required_files = {
        'backend/main.py': 'Backend - main.py',
        'backend/app.py': 'Backend - app.py',
        'backend/.env': 'Backend - configuración',
        'backend/requirements.txt': 'Backend - dependencias',
        'src/api/auth.js': 'Frontend - API client',
        'src/componentes/login/login.jsx': 'Frontend - Login component',
        'package.json': 'Frontend - configuración',
    }
    
    for file_path, description in required_files.items():
        if check_file(file_path):
            print(f"  {Colors.GREEN}✓{Colors.END} {description}")
        else:
            print(f"  {Colors.RED}✗{Colors.END} {description}")
            issues.append(f"Falta archivo: {file_path}")
    
    # 5. Verificar dependencias Node
    print(f"{Colors.BLUE}[5/8]{Colors.END} Verificando dependencias Node...")
    if check_file('node_modules'):
        print(f"  {Colors.GREEN}✓{Colors.END} node_modules existe")
    else:
        print(f"  {Colors.YELLOW}⚠{Colors.END} node_modules no existe")
        print(f"  {Colors.YELLOW}  Ejecuta: npm install{Colors.END}")
    
    # 6. Verificar dependencias Python
    print(f"{Colors.BLUE}[6/8]{Colors.END} Verificando dependencias Python...")
    required_packages = ['flask', 'flask_cors', 'psycopg2', 'bcrypt', 'jwt', 'dotenv']
    try:
        result = subprocess.run(['pip', 'list'], capture_output=True, text=True)
        installed = result.stdout.lower()
        
        missing = []
        for pkg in required_packages:
            if pkg in installed:
                print(f"  {Colors.GREEN}✓{Colors.END} {pkg}")
            else:
                print(f"  {Colors.RED}✗{Colors.END} {pkg}")
                missing.append(pkg)
        
        if missing:
            issues.append(f"Faltan paquetes Python: {', '.join(missing)}")
    except:
        print(f"  {Colors.RED}✗{Colors.END} Error verificando pip")
        issues.append("No se pudo verificar paquetes pip")
    
    # 7. Verificar .env
    print(f"{Colors.BLUE}[7/8]{Colors.END} Verificando configuración backend/.env...")
    if check_file('backend/.env'):
        try:
            with open('backend/.env', 'r') as f:
                content = f.read()
                if 'DB_HOST' in content and 'DB_USER' in content:
                    print(f"  {Colors.GREEN}✓{Colors.END} .env configurado")
                else:
                    print(f"  {Colors.YELLOW}⚠{Colors.END} .env incompleto")
                    issues.append(".env no tiene todas las variables necesarias")
        except:
            print(f"  {Colors.RED}✗{Colors.END} Error leyendo .env")
    else:
        print(f"  {Colors.RED}✗{Colors.END} .env no existe")
        issues.append("backend/.env es necesario")
    
    # 8. Verificar sintaxis Python
    print(f"{Colors.BLUE}[8/8]{Colors.END} Verificando sintaxis Python...")
    try:
        subprocess.run(
            ['python', '-m', 'py_compile', 'backend/main.py', 'backend/app.py'],
            capture_output=True,
            timeout=10
        )
        print(f"  {Colors.GREEN}✓{Colors.END} Sintaxis Python válida")
    except:
        print(f"  {Colors.RED}✗{Colors.END} Error en sintaxis Python")
        issues.append("Hay errores de sintaxis en Python")
    
    # Resumen final
    print(f"\n{Colors.BLUE}{'='*70}")
    print(f"RESUMEN{Colors.END}")
    print(f"{Colors.BLUE}{'='*70}{Colors.END}\n")
    
    if not issues:
        print(f"{Colors.GREEN}✓ ¡TODO ESTÁ LISTO!{Colors.END}\n")
        print(f"Puedes ejecutar:")
        print(f"  Terminal #1: cd backend && python main.py")
        print(f"  Terminal #2: npm run dev")
        print(f"  Navegador:   http://localhost:5173\n")
    else:
        print(f"{Colors.RED}✗ HAY {len(issues)} PROBLEMA(S):{Colors.END}\n")
        for i, issue in enumerate(issues, 1):
            print(f"  {i}. {issue}")
        print()
        print(f"{Colors.YELLOW}Soluciona los problemas arriba y vuelve a ejecutar este script.{Colors.END}\n")
        return 1
    
    print(f"{Colors.BLUE}¡Buena suerte! 🚀{Colors.END}\n")
    return 0

if __name__ == '__main__':
    sys.exit(main())
