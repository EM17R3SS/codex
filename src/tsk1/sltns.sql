//1.1
SELECT departments.id AS "departments.id"
FROM public.departments
    //left join для получения всех отделов из департментс
    //коннект с депнеймс если совпадение
LEFT JOIN public.dep_names ON departments.id = dep_names.department_id
    //on ... для связи отдела и названия
WHERE dep_names.id IS NULL

//1.2
SELECT departments.id AS "departments.id"
FROM public.departments
    //inner для существования неймов
INNER JOIN public.dep_names ON departments.id = dep_names.department_id
GROUP BY departments.id//for having

HAVING COUNT(dep_names.id) >= 2//for count

//1.3
SELECT departments.*, dep_names.name AS "dep_names.name"
FROM public.departments
INNER JOIN public.dep_names ON departments.id = dep_names.department_id
WHERE dep_names.id = (
    SELECT MIN(dep_names_min.id)
    FROM public.dep_names AS dep_names_min
    WHERE dep_names_min.department_id = departments.id
)
