package com.a603.youlangme.repository.log;

import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.log.ExpAcquisitionLog;
import com.a603.youlangme.entity.meta.ExpActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpLogRepository extends JpaRepository<ExpAcquisitionLog,Long> {

    List<ExpAcquisitionLog> findAllByUser(User user);
    List<ExpAcquisitionLog> findAllByUserAndActivity(User user, ExpActivity activity);
    Integer countByUserAndActivity(User user, ExpActivity activity);
}
