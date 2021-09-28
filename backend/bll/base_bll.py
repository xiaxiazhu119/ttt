class BaseBLL(object):
  
    dal = None
        
    def create(self, obj):
        return self.dal.create(obj);

    def read(self, id):
        return self.dal.read(id);

    def update(self, obj):
        return self.dal.update(obj);

    def delete(self, id):
        return self.dal.delete(id);

    def get_list_by_condition(self, sc):
        return self.dal.get_list_by_condition(sc);
        