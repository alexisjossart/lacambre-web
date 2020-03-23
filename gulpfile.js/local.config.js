/* ---------------------------------------
  LOCAL CONFIG
   --------------------------------------- */

module.exports = {
  deploy: {
    source: 'public/',
    user: 'USERNAME',
    host: 'HOSTNAME.TLD',
    dest: 'dist/',
    exclude_list: 'rsync-exclude.txt'
  }
};
