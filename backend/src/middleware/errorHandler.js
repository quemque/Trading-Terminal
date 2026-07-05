module.exports = (err, req, res, next) => {
   console.error('❌ Error:', err.message)

   if (err.type === 'API_ERROR') {
      return res.status(err.status || 500).json({
         error: err.message,
      })
   }

   res.status(500).json({
      error: 'Internal server error',
   })
}
