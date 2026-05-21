-- ─────────────────────────────────────────────
-- SCRIPT DE DATOS - gestion_quads
-- ─────────────────────────────────────────────

-- ── Categorias ────────────────────────────────

INSERT INTO categorias (nombre) VALUES ('Deportivo');
INSERT INTO categorias (nombre) VALUES ('Utilitarios (ATV)');
INSERT INTO categorias (nombre) VALUES ('Recreativos');


-- ── Quads ─────────────────────────────────────

INSERT INTO quads (idCategoria, marca, modelo, matricula, precioDia, imagen, estado) VALUES
(1, 'Beta',        'RR 125',       'AS1111BB', 70.00,  'https://www.betamotor.com/wp-content/uploads/2022/09/RR-125-4T-2023-Beta-Motor.jpg',                                      'Disponible'),
(1, 'Husqvarna',   'FC 350',       'AS2222CC', 95.00,  'https://www.husqvarna-motorcycles.com/content/dam/husqvarna/products/offroad/fc/2024/fc-350/fc-350-2024-lhf.png',          'Disponible'),
(1, 'Gas Gas',     'EC 300',       'AS3333DD', 80.00,  'https://www.gasgas.com/content/dam/gasgas/models/offroad/ec/2024/ec-300/ec-300-2024-rhs.png',                              'Disponible'),
(2, 'John Deere',  'Gator 825i',   'AS4444EE', 110.00, 'https://www.deere.com/assets/images/region-4/products/gator-utility-vehicles/825i-s4/825i-s4-r4g035694-row-large.jpg',   'Disponible'),
(2, 'Kubota',      'RTV-X1100C',   'AS5555FF', 105.00, 'https://www.kubota.com/assets/img/product/utility-vehicles/rtv-x1100c/rtv-x1100c-01.jpg',                                'Disponible'),
(2, 'Arctic Cat',  'Alterra 700',  'AS6666GG', 85.00,  'https://www.arcticcat.com/sites/default/files/2023-arctic-cat-alterra-700.jpg',                                           'Disponible'),
(3, 'TGB',         'Blade 550',    'AS7777HH', 65.00,  'https://www.tgb.es/wp-content/uploads/2022/01/blade550iq.jpg',                                                            'Disponible'),
(3, 'CF Moto',     'CForce 520',   'AS8888II', 60.00,  'https://www.cfmoto.com/uploads/product/20210901/1630459200.jpg',                                                          'Disponible'),
(3, 'Linhai',      'LH400ATV',     'AS9999JJ', 50.00,  'https://www.linhai.com/uploads/product/400atv.jpg',                                                                      'Disponible'),
(1, 'Sherco',      'SEF 450',      'AS1010KK', 90.00,  'https://www.sherco.com/wp-content/uploads/2023/09/SEF-450-2024.jpg',                                                     'Disponible'),
(2, 'Kioti',       'K9 2400',      'AS1111LL', 115.00, 'https://www.kioti.com/wp-content/uploads/2022/05/K9-2400-Side.jpg',                                                      'Disponible'),
(3, 'Kymco',       'MXU 550i',     'AS1212MM', 58.00,  'https://www.kymco.com/content/dam/kymco/products/atv/mxu-550i/mxu-550i-main.jpg',                                       'Disponible');


-- ── Clientes ──────────────────────────────────

INSERT INTO clientes (nombre, email, telefono) VALUES
('Roberto Iglesias',   'roberto@hotmail.com',  '611223344'),
('Sofía Mendoza',      'sofia@hotmail.com',     '622334455'),
('Diego Castellano',   'diego@hotmail.com',     '633445566'),
('Elena Vázquez',      'elena@hotmail.com',     '644556677'),
('Marcos Prieto',      'marcos@hotmail.com',    '655667788'),
('Natalia Herrero',    'natalia@hotmail.com',   '666778899'),
('Iván Morales',       'ivan@hotmail.com',      '677889900');


-- ── Alquileres ────────────────────────────────

INSERT INTO alquileres (idQuad, idCliente, fechaInicio, fechaFin, precioFinal) VALUES
-- Finalizados
(7, 1, '2026-04-10', '2026-04-12', 130.00),
(8, 2, '2026-04-15', '2026-04-18', 180.00),
(9, 3, '2026-04-20', '2026-04-22', 100.00),
(10,4, '2026-05-01', '2026-05-04', 270.00),
(11,5, '2026-05-05', '2026-05-07', 230.00),
-- Activos
(1, 1, '2026-05-20', '2026-05-27', 490.00),
(2, 2, '2026-05-21', '2026-05-24', 285.00),
(3, 3, '2026-05-22', '2026-05-28', 480.00);


