cmake_minimum_required(VERSION 3.16)
project(CodexNodeJSInternship VERSION 1.0.0 LANGUAGES)

option(BUILD_TESTS "Build tests" ON)
option(BUILD_DOCS "Build documentation" OFF)

set(PROJECT_DESCRIPTION "Node.js Internship Test Solutions for Codex")
set(AUTHOR "EM17R3SS")

# Создаем структуру каталогов после конфигурации
configure_file(
    ${CMAKE_SOURCE_DIR}/README.md
    ${CMAKE_BINARY_DIR}/README.md
    COPYONLY
)

add_custom_target(task1 COMMENT "SQL Queries - see src/task1/")
add_custom_target(task2 COMMENT "Database Design - see src/task2/")
add_custom_target(task3 COMMENT "Square Check - see src/task3/")
add_custom_target(task4 COMMENT "Two Sum - see src/task4/")
add_custom_target(task5 COMMENT "Async Rewrite - see src/task5/")
add_custom_target(task6 COMMENT "HTML Analyzer - see src/task6/")

add_custom_target(run-all
    COMMAND ${CMAKE_COMMAND} -E echo "=== Codex Node.js Intern Tasks ==="
    COMMAND ${CMAKE_COMMAND} -E echo "Node.js version:"
    COMMAND node --version
    COMMAND ${CMAKE_COMMAND} -E echo ""
    COMMAND ${CMAKE_COMMAND} -E echo "Task 3: isSquare test"
    COMMAND cd ${CMAKE_SOURCE_DIR}/src/task3 && node test.js
    COMMAND ${CMAKE_COMMAND} -E echo ""
    COMMAND ${CMAKE_COMMAND} -E echo "Task 4: Two Sum test"
    COMMAND cd ${CMAKE_SOURCE_DIR}/src/task4 && node test.js
    COMMAND ${CMAKE_COMMAND} -E echo ""
    COMMAND ${CMAKE_COMMAND} -E echo "Task 6: HTML Analyzer"
    COMMAND cd ${CMAKE_SOURCE_DIR}/src/task6 && node analyzer.js
    WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
    COMMENT "Running all Node.js tasks"
)

add_custom_target(init
    COMMAND ${CMAKE_COMMAND} -E make_directory ${CMAKE_SOURCE_DIR}/src/tsk1
    COMMAND ${CMAKE_COMMAND} -E make_directory ${CMAKE_SOURCE_DIR}/src/tsk2
    COMMAND ${CMAKE_COMMAND} -E make_directory ${CMAKE_SOURCE_DIR}/src/tsk3
    COMMAND ${CMAKE_COMMAND} -E make_directory ${CMAKE_SOURCE_DIR}/src/tsk4
    COMMAND ${CMAKE_COMMAND} -E make_directory ${CMAKE_SOURCE_DIR}/src/tsk5
    COMMAND ${CMAKE_COMMAND} -E make_directory ${CMAKE_SOURCE_DIR}/src/tsk6
    COMMAND ${CMAKE_COMMAND} -E make_directory ${CMAKE_SOURCE_DIR}/tests
    COMMAND ${CMAKE_COMMAND} -E make_directory ${CMAKE_SOURCE_DIR}/docs
    COMMAND ${CMAKE_COMMAND} -E echo "Project structure created"
    COMMENT "Initialize project directories"
)

message(STATUS "========================================")
message(STATUS "Project: ${PROJECT_NAME}")
message(STATUS "Description: ${PROJECT_DESCRIPTION}")
message(STATUS "Version: ${PROJECT_VERSION}")
message(STATUS "Author: ${AUTHOR}")
message(STATUS "========================================")
