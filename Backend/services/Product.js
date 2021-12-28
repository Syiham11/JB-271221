const pool = require("../config/db");

const ProductsService = {
  async getAll(params) {
    try {
      let qParams = {
        offset: (Number(params.page) - 1) * Number(params.limit),
        limit: Number(params.limit),
        where: {},
      };

      const { rows } = await pool.query(
        'SELECT * FROM "Products" ORDER BY id ASC  LIMIT $1 OFFSET $2',
        [qParams.limit, qParams.offset]
      );
      
      const result = await pool.query('SELECT COUNT(id) FROM "Products"');

      const pagination = {
        page: Number(params.page),
        limit: Number(params.limit),
        currentData: rows.length,
        totalData: result.rows ? parseInt(result.rows[0].count) : 0,
        totalPage: Math.ceil(parseInt(result.rows[0].count) / Number(params.limit)),
      };
      return {
        pagination: pagination,
        data: rows,
      };
    } catch (error) {
      console.log(error);
    }
  },
  async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM "Products" WHERE id = $1',
      [id]
    );
    return rows;
  },
  async update(id, data) {
    
    const { rows } = await pool.query(
        'SELECT * FROM "Products" WHERE id = $1',
        [data.id]
      );
      if(rows.length != 0)
      {
       await pool.query('UPDATE "Products" SET id=$1, name=$2, stock=$3, price=$4, "imageUrl"=$5, description=$6 WHERE id=$1', [
           id,
           data.name,
           data.stock,
           data.price,
           data.imageUrl,
           data.description
       ])
       return data;
      }else{
        return {data:"Maaf SKU Sudah Tidak ADA"}
      }
  },

  async create(data) {
    const { rows } = await pool.query(
        'SELECT * FROM "Products" WHERE id = $1',
        [data.id]
      );
      if(rows.length != 0)
      {
       return {data:"Maaf SKU Sudah Terpakai"}
      }else{
        let date = '2021-12-26 10:40:00.301000 +00:00'
        pool.query(
        'INSERT INTO "Products" (id, name, stock, price, "imageUrl", description, "createdAt","updatedAt") VALUES($1, $2, $3, $4, $5, $6, $7, $8);',
        [
            data.id,
            data.name,
            data.stock,
            data.price,
            data.imageUrl,
            data.description,
            date,
            date
        ]
        );
        return data;
      }
      
  },
  async delete(id) {
    const { rows } = await pool.query(
        'SELECT * FROM "Products" WHERE id = $1',
        [id]
      );
      if(rows.length != 0)
      {
          await pool.query('DELETE FROM "Products" WHERE id=$1', [id])
          return { status: "success" };

      }else{

        return { status: "Maaf Data Tidak Ditemukan" };

      }
  },
};

module.exports = ProductsService;
